-- Enable pgcrypto for password hashing if needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. ENUMS
CREATE TYPE tenant_plan AS ENUM ('Starter', 'Business', 'Enterprise');
CREATE TYPE tenant_status AS ENUM ('Active', 'Suspended', 'Trial');
CREATE TYPE admin_role AS ENUM ('Super Admin', 'Admin', 'User');
CREATE TYPE admin_status AS ENUM ('Active', 'Inactive');
CREATE TYPE campaign_type AS ENUM ('Promotional', 'Transactional', 'Premium', 'Shortcode');
CREATE TYPE campaign_status AS ENUM ('Completed', 'Running', 'Scheduled', 'Draft', 'Paused');
CREATE TYPE contact_status AS ENUM ('Active', 'Opted-out');
CREATE TYPE sender_id_type AS ENUM ('Promotional', 'Transactional');
CREATE TYPE sender_id_status AS ENUM ('Approved', 'Pending', 'Rejected');
CREATE TYPE shortcode_status AS ENUM ('Active', 'Inactive', 'Pending');
CREATE TYPE premium_service_status AS ENUM ('Active', 'Suspended', 'Pending');

-- 2. TABLES

-- Tenants (Organizations)
CREATE TABLE tenants (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company TEXT NOT NULL,
    contact_person TEXT,
    plan tenant_plan DEFAULT 'Starter',
    sms_balance BIGINT DEFAULT 0,
    status tenant_status DEFAULT 'Trial',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users (linked to Supabase Auth)
CREATE TABLE admin_users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    auth_user_id UUID UNIQUE, -- Link to auth.users(id)
    tenant_id INT REFERENCES tenants(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role admin_role DEFAULT 'User',
    status admin_status DEFAULT 'Active',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sender IDs
CREATE TABLE sender_ids (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type sender_id_type DEFAULT 'Promotional',
    status sender_id_status DEFAULT 'Pending',
    registered_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Groups
CREATE TABLE contact_groups (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    contact_count INT DEFAULT 0,
    last_used TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts
CREATE TABLE contacts (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_id INT REFERENCES contact_groups(id) ON DELETE CASCADE,
    name TEXT,
    phone TEXT NOT NULL,
    tags TEXT[],
    status contact_status DEFAULT 'Active',
    date_added TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns
CREATE TABLE campaigns (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    sender_id_text TEXT, -- The name of the sender ID used
    name TEXT NOT NULL,
    type campaign_type DEFAULT 'Promotional',
    recipients_count INT DEFAULT 0,
    sent_count INT DEFAULT 0,
    delivered_count INT DEFAULT 0,
    failed_count INT DEFAULT 0,
    status campaign_status DEFAULT 'Draft',
    created_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shortcodes
CREATE TABLE shortcodes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    keyword TEXT,
    service TEXT,
    status shortcode_status DEFAULT 'Pending',
    monthly_volume INT DEFAULT 0,
    revenue DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Premium Services
CREATE TABLE premium_services (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    shortcode_id INT REFERENCES shortcodes(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    keyword TEXT,
    tariff DECIMAL(10, 2) DEFAULT 0.00,
    subscriptions_count INT DEFAULT 0,
    revenue DECIMAL(12, 2) DEFAULT 0.00,
    status premium_service_status DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE SET NULL,
    admin_user_id INT REFERENCES admin_users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDEXES
CREATE INDEX idx_contacts_phone ON contacts(phone);
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_tenants_status ON tenants(status);

-- 4. TRIGGER FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_sender_ids_updated_at BEFORE UPDATE ON sender_ids FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_contact_groups_updated_at BEFORE UPDATE ON contact_groups FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_shortcodes_updated_at BEFORE UPDATE ON shortcodes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_premium_services_updated_at BEFORE UPDATE ON premium_services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 5. SUPER ADMIN INSERTION
-- Note: This part assumes it's run in a Supabase environment where auth schema exists.
-- Password hashing: Ziratech@2026

DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Check if user already exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'support@ziratech.com') THEN
    -- Insert into auth.users (Supabase managed table)
    -- We use crypt() for the password hash
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'support@ziratech.com',
      crypt('Ziratech@2026', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Zira Tech Support"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    )
    RETURNING id INTO new_user_id;

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    )
    VALUES (
      gen_random_uuid(),
      new_user_id,
      format('{"sub":"%s","email":"%s"}', new_user_id::text, 'support@ziratech.com')::jsonb,
      'email',
      NOW(),
      NOW(),
      NOW()
    );

    -- Insert into public.admin_users
    INSERT INTO public.admin_users (
      auth_user_id,
      name,
      email,
      role,
      status
    )
    VALUES (
      new_user_id,
      'Zira Tech Support',
      'support@ziratech.com',
      'Super Admin',
      'Active'
    );
  END IF;
END $$;
