-- Enable pgcrypto for password hashing
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
CREATE TYPE transaction_type AS ENUM ('Top-up', 'Usage', 'Refund', 'Adjustment');
CREATE TYPE message_status AS ENUM ('Pending', 'Sent', 'Delivered', 'Failed', 'Rejected', 'Buffered');
CREATE TYPE route_strategy AS ENUM ('Least Cost', 'High Priority', 'Round Robin');

-- 2. TABLES

-- Tenants (Organizations/Customers)
CREATE TABLE tenants (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company TEXT NOT NULL,
    contact_person TEXT,
    plan tenant_plan DEFAULT 'Starter',
    sms_balance DECIMAL(12, 4) DEFAULT 0.0000, -- Changed to decimal for precise credit management
    currency CHAR(3) DEFAULT 'KES',
    status tenant_status DEFAULT 'Trial',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users (linked to Supabase Auth)
CREATE TABLE admin_users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    auth_user_id UUID UNIQUE,
    tenant_id INT REFERENCES tenants(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role admin_role DEFAULT 'User',
    status admin_status DEFAULT 'Active',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SMS Providers (The 3rd party gateways we resell from)
CREATE TABLE sms_providers (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    api_endpoint TEXT,
    api_key_id TEXT,
    api_secret TEXT,
    callback_url TEXT,
    priority INT DEFAULT 1, -- 1 is highest
    is_active BOOLEAN DEFAULT TRUE,
    buying_price_per_sms DECIMAL(10, 4) DEFAULT 0.0000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rate Plans (To manage different pricing for different customers)
CREATE TABLE rate_plans (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rates (Pricing per country/prefix for each rate plan)
CREATE TABLE rates (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rate_plan_id INT REFERENCES rate_plans(id) ON DELETE CASCADE,
    country_code TEXT NOT NULL, -- e.g., '254'
    prefix TEXT, -- e.g., '71', '72' (optional for more granular routing)
    selling_price DECIMAL(10, 4) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(rate_plan_id, country_code, prefix)
);

-- Billing Transactions (Credit Ledger)
CREATE TABLE billing_transactions (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount DECIMAL(12, 4) NOT NULL,
    balance_before DECIMAL(12, 4) NOT NULL,
    balance_after DECIMAL(12, 4) NOT NULL,
    reference TEXT, -- e.g., M-Pesa code or Message ID
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Keys (For developer integration)
CREATE TABLE api_keys (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    key_hint TEXT NOT NULL, -- e.g., 'sk_live_...1234'
    encrypted_key TEXT NOT NULL,
    name TEXT DEFAULT 'Default Key',
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
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
    sender_id_text TEXT,
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

-- Individual Messages (The high-volume log)
CREATE TABLE messages (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    campaign_id INT REFERENCES campaigns(id) ON DELETE SET NULL,
    provider_id INT REFERENCES sms_providers(id) ON DELETE SET NULL,
    sender_id_text TEXT,
    recipient_phone TEXT NOT NULL,
    message_body TEXT NOT NULL,
    segments INT DEFAULT 1,
    cost DECIMAL(10, 4) DEFAULT 0.0000,
    provider_ref TEXT, -- Reference ID from the 3rd party gateway
    status message_status DEFAULT 'Pending',
    error_code TEXT,
    error_description TEXT,
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
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

-- Webhook Endpoints (For DLRs to customers)
CREATE TABLE webhook_endpoints (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    secret TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
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
CREATE INDEX idx_messages_recipient ON messages(recipient_phone);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_tenant ON messages(tenant_id);
CREATE INDEX idx_messages_provider_ref ON messages(provider_ref);
CREATE INDEX idx_billing_tenant ON billing_transactions(tenant_id);
CREATE INDEX idx_contacts_phone ON contacts(phone);
CREATE INDEX idx_rates_lookup ON rates(country_code, prefix);

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
CREATE TRIGGER update_sms_providers_updated_at BEFORE UPDATE ON sms_providers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_sender_ids_updated_at BEFORE UPDATE ON sender_ids FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_contact_groups_updated_at BEFORE UPDATE ON contact_groups FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_shortcodes_updated_at BEFORE UPDATE ON shortcodes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_premium_services_updated_at BEFORE UPDATE ON premium_services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 5. SUPER ADMIN INSERTION
DO $$
DECLARE
  new_user_id UUID;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'support@ziratech.com') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'support@ziratech.com', crypt('Ziratech@2026', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Zira Tech Support"}', NOW(), NOW(), '', '', '', ''
    )
    RETURNING id INTO new_user_id;

    INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), new_user_id, format('{"sub":"%s","email":"%s"}', new_user_id::text, 'support@ziratech.com')::jsonb, 'email', NOW(), NOW(), NOW());

    INSERT INTO public.admin_users (auth_user_id, name, email, role, status)
    VALUES (new_user_id, 'Zira Tech Support', 'support@ziratech.com', 'Super Admin', 'Active');
  END IF;
END $$;
