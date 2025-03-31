import { supabase } from '@/lib/supabase';

export const apiKeyService = {
  async fetchApiKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createApiKey(keyData) {
    const newKey = {
      name: keyData.name,
      value: keyData.value || `tvly-dev-${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`,
      type: 'dev',
      usage: parseInt(keyData.usage) || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('api_keys')
      .insert([newKey])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateApiKey(id, updates) {
    const { data, error } = await supabase
      .from('api_keys')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteApiKey(id) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 