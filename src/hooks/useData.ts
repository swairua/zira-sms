import { useState, useEffect } from 'react';
import * as services from '@/lib/services';
import * as dummyData from '@/data/dummy-data';

// --- Configuration to toggle Supabase ---
const USE_SUPABASE = import.meta.env.VITE_USE_SUPABASE === 'true';

export function useDashboardData() {
  const [data, setData] = useState({
    kpis: dummyData.kpiData,
    messagesOverTime: dummyData.messagesOverTime,
    messageTypeBreakdown: dummyData.messageTypeBreakdown,
  });
  const [loading, setLoading] = useState(USE_SUPABASE);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!USE_SUPABASE) return;

    async function fetchData() {
      try {
        const [kpiRes, timeRes, typeRes] = await Promise.all([
          services.getDashboardKPIs(),
          services.getMessagesOverTime(),
          services.getMessageTypeBreakdown(),
        ]);

        if (kpiRes.error) throw kpiRes.error;
        if (timeRes.error) throw timeRes.error;
        if (typeRes.error) throw typeRes.error;

        setData({
          kpis: kpiRes.data as any,
          messagesOverTime: timeRes.data as any,
          messageTypeBreakdown: typeRes.data as any,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { ...data, loading, error };
}

export function useCampaigns() {
  const [data, setData] = useState<any[]>(dummyData.campaigns);
  const [loading, setLoading] = useState(USE_SUPABASE);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!USE_SUPABASE) return;

    async function fetchData() {
      const { data: resData, error: resError } = await services.getCampaigns();
      if (resError) setError(resError);
      else setData(resData as any[]);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useContacts() {
  const [data, setData] = useState<any[]>(dummyData.contacts);
  const [groups, setGroups] = useState<any[]>(dummyData.contactGroups);
  const [loading, setLoading] = useState(USE_SUPABASE);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!USE_SUPABASE) return;

    async function fetchData() {
      const [contactRes, groupRes] = await Promise.all([
        services.getContacts(),
        services.getContactGroups(),
      ]);

      if (contactRes.error) setError(contactRes.error);
      else setData(contactRes.data as any[]);

      if (groupRes.error) setError(groupRes.error);
      else setGroups(groupRes.data as any[]);

      setLoading(false);
    }

    fetchData();
  }, []);

  return { contacts: data, groups, loading, error };
}

export function useSenderIds() {
  const [data, setData] = useState<any[]>(dummyData.senderIds);
  const [loading, setLoading] = useState(USE_SUPABASE);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!USE_SUPABASE) return;

    async function fetchData() {
      const { data: resData, error: resError } = await services.getSenderIds();
      if (resError) setError(resError);
      else setData(resData as any[]);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useAdminTenants() {
  const [data, setData] = useState<any[]>(dummyData.tenants);
  const [loading, setLoading] = useState(USE_SUPABASE);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!USE_SUPABASE) return;

    async function fetchData() {
      const { data: resData, error: resError } = await services.getTenants();
      if (resError) setError(resError);
      else setData(resData as any[]);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useAdminUsers() {
  const [data, setData] = useState<any[]>(dummyData.adminUsers);
  const [loading, setLoading] = useState(USE_SUPABASE);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!USE_SUPABASE) return;

    async function fetchData() {
      const { data: resData, error: resError } = await services.getAdminUsers();
      if (resError) setError(resError);
      else setData(resData as any[]);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useAuditLogs() {
  const [data, setData] = useState<any[]>(dummyData.auditLog);
  const [loading, setLoading] = useState(USE_SUPABASE);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!USE_SUPABASE) return;

    async function fetchData() {
      const { data: resData, error: resError } = await services.getAuditLogs();
      if (resError) setError(resError);
      else setData(resData as any[]);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
