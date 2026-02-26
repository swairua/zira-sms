import { supabase } from './supabase';
import { PostgrestError } from '@supabase/supabase-js';

// --- Types (Matching the Schema) ---

export interface ServiceResponse<T> {
  data: T | null;
  error: PostgrestError | Error | null;
}

// --- Dashboard Services ---

export const getDashboardKPIs = async () => {
  const { data: messages, error: mError } = await supabase
    .from('messages')
    .select('status, selling_price');

  if (mError) return { data: null, error: mError };

  const { count: activeCampaigns, error: cError } = await supabase
    .from('campaigns')
    .select('*', { count: 'exact', head: true })
    .in('status', ['Running', 'Scheduled']);

  const { count: activeSenderIds, error: sError } = await supabase
    .from('sender_ids')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Approved');

  const totalSent = messages?.length || 0;
  const delivered = messages?.filter(m => m.status === 'Delivered').length || 0;
  const deliveryRate = totalSent > 0 ? (delivered / totalSent * 100).toFixed(1) + '%' : '0%';
  const revenue = messages?.reduce((acc, m) => acc + (Number(m.selling_price) || 0), 0) || 0;

  return {
    data: {
      totalMessagesSent: totalSent.toLocaleString(),
      deliveryRate,
      activeCampaigns: activeCampaigns || 0,
      revenueThisMonth: '$' + revenue.toLocaleString(),
      activeSenderIds: activeSenderIds || 0,
    },
    error: cError || sError || null,
  };
};

export const getMessagesOverTime = async (days = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('messages')
    .select('status, created_at')
    .gte('created_at', startDate.toISOString());

  if (error) return { data: null, error };

  // Group by date
  const grouped = data.reduce((acc: any, msg) => {
    const date = new Date(msg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!acc[date]) acc[date] = { date, sent: 0, delivered: 0, failed: 0 };
    acc[date].sent++;
    if (msg.status === 'Delivered') acc[date].delivered++;
    if (msg.status === 'Failed') acc[date].failed++;
    return acc;
  }, {});

  return { data: Object.values(grouped), error: null };
};

export const getMessageTypeBreakdown = async () => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('type, recipients_count');

  if (error) return { data: null, error };

  const breakdown = data.reduce((acc: any, camp) => {
    const type = camp.type || 'Unknown';
    if (!acc[type]) acc[type] = 0;
    acc[type] += camp.recipients_count || 0;
    return acc;
  }, {});

  const colors: Record<string, string> = {
    Promotional: "hsl(215, 70%, 45%)",
    Transactional: "hsl(142, 72%, 29%)",
    Premium: "hsl(38, 92%, 50%)",
    Shortcode: "hsl(280, 60%, 50%)",
  };

  return {
    data: Object.entries(breakdown).map(([name, value]) => ({
      name,
      value,
      fill: colors[name] || "hsl(215, 70%, 45%)"
    })),
    error: null
  };
};

// --- Campaign Services ---

export const getCampaigns = async () => {
  return supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });
};

export const createCampaign = async (campaign: any) => {
  return supabase.from('campaigns').insert(campaign).select().single();
};

// --- Contact Services ---

export const getContacts = async () => {
  return supabase.from('contacts').select('*');
};

export const getContactGroups = async () => {
  return supabase.from('contact_groups').select('*');
};

// --- Sender ID Services ---

export const getSenderIds = async () => {
  return supabase.from('sender_ids').select('*');
};

// --- Admin Services ---

export const getTenants = async () => {
  return supabase.from('tenants').select('*');
};

export const getAdminUsers = async () => {
  return supabase.from('admin_users').select('*');
};

export const getAuditLogs = async () => {
  return supabase
    .from('audit_logs')
    .select('*, admin_users(name)')
    .order('timestamp', { ascending: false });
};

// --- Shortcode & Premium Services ---

export const getShortcodes = async () => {
  return supabase.from('shortcodes').select('*');
};

export const getPremiumServices = async () => {
  return supabase.from('premium_services').select('*');
};
