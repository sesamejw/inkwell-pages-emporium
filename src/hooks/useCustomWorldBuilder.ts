import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface UniverseSettings {
  id?: string;
  campaign_id: string;
  mode: "thouart" | "original";
  world_name: string | null;
  world_description: string | null;
  rules_document: string | null;
  custom_stats: Record<string, unknown>;
}

export interface CustomRace {
  id: string;
  campaign_id: string;
  name: string;
  description: string | null;
  stat_bonuses: Record<string, number>;
  image_url: string | null;
  lore: string | null;
}

export interface CustomMagic {
  id: string;
  campaign_id: string;
  name: string;
  magic_type: string | null;
  rules: string | null;
  casting_cost: Record<string, unknown>;
  effects: Record<string, unknown>;
}

export interface CustomBelief {
  id: string;
  campaign_id: string;
  name: string;
  deity_name: string | null;
  description: string | null;
  rituals: unknown[];
  divine_powers: unknown[];
}

export interface CustomItem {
  id: string;
  campaign_id: string;
  name: string;
  item_type: string;
  description: string | null;
  effects: Record<string, unknown>;
  rarity: string;
  icon_url: string | null;
}

export const useCustomWorldBuilder = (campaignId: string) => {
  const [universeSettings, setUniverseSettings] = useState<UniverseSettings | null>(null);
  const [races, setRaces] = useState<CustomRace[]>([]);
  const [magicSystems, setMagicSystems] = useState<CustomMagic[]>([]);
  const [beliefs, setBeliefs] = useState<CustomBelief[]>([]);
  const [items, setItems] = useState<CustomItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    if (!campaignId) return;
    setLoading(true);

    const [settingsRes, racesRes, magicRes, beliefsRes, itemsRes] = await Promise.all([
      supabase.from("rp_campaign_universe").select("*").eq("campaign_id", campaignId).maybeSingle(),
      supabase.from("rp_custom_races").select("*").eq("campaign_id", campaignId).order("created_at"),
      supabase.from("rp_custom_magic").select("*").eq("campaign_id", campaignId).order("created_at"),
      supabase.from("rp_custom_beliefs").select("*").eq("campaign_id", campaignId).order("created_at"),
      supabase.from("rp_custom_items").select("*").eq("campaign_id", campaignId).order("created_at"),
    ]);

    if (settingsRes.data) {
      setUniverseSettings({
        ...settingsRes.data,
        mode: settingsRes.data.mode as "thouart" | "original",
        custom_stats: (settingsRes.data.custom_stats || {}) as Record<string, unknown>,
      });
    }

    setRaces((racesRes.data || []).map(r => ({ ...r, stat_bonuses: (r.stat_bonuses || {}) as Record<string, number> })));
    setMagicSystems((magicRes.data || []).map(m => ({ ...m, casting_cost: (m.casting_cost || {}) as Record<string, unknown>, effects: (m.effects || {}) as Record<string, unknown> })));
    setBeliefs((beliefsRes.data || []).map(b => ({ ...b, rituals: (b.rituals || []) as unknown[], divine_powers: (b.divine_powers || []) as unknown[] })));
    setItems((itemsRes.data || []).map(i => ({ ...i, effects: (i.effects || {}) as Record<string, unknown> })));

    setLoading(false);
  }, [campaignId]);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Universe settings
  const saveUniverseSettings = async (settings: Partial<UniverseSettings>) => {
    const { custom_stats, ...rest } = settings;
    const payload: Record<string, unknown> = { ...rest };
    if (custom_stats) payload.custom_stats = custom_stats as unknown as Record<string, never>;
    if (universeSettings?.id) {
      const { error } = await supabase.from("rp_campaign_universe").update(payload).eq("id", universeSettings.id);
      if (error) { toast({ title: "Failed to save settings", variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("rp_campaign_universe").insert([{ campaign_id: campaignId, ...payload }]);
      if (error) { toast({ title: "Failed to create settings", variant: "destructive" }); return; }
    }
    toast({ title: "Universe settings saved" });
    await loadAll();
  };

  // CRUD helpers
  const addRace = async (race: Omit<CustomRace, "id" | "campaign_id">) => {
    const { error } = await supabase.from("rp_custom_races").insert({ campaign_id: campaignId, ...race, stat_bonuses: race.stat_bonuses as unknown as Record<string, never> });
    if (error) { toast({ title: "Failed to add race", variant: "destructive" }); return; }
    toast({ title: "Race added" }); await loadAll();
  };

  const updateRace = async (id: string, updates: Partial<CustomRace>) => {
    const { stat_bonuses, ...rest } = updates;
    const payload = stat_bonuses ? { ...rest, stat_bonuses: stat_bonuses as unknown as Record<string, never> } : rest;
    const { error } = await supabase.from("rp_custom_races").update(payload).eq("id", id);
    if (error) { toast({ title: "Failed to update race", variant: "destructive" }); return; }
    toast({ title: "Race updated" }); await loadAll();
  };

  const deleteRace = async (id: string) => {
    const { error } = await supabase.from("rp_custom_races").delete().eq("id", id);
    if (error) { toast({ title: "Failed to delete race", variant: "destructive" }); return; }
    toast({ title: "Race deleted" }); await loadAll();
  };

  const addMagic = async (magic: Omit<CustomMagic, "id" | "campaign_id">) => {
    const { error } = await supabase.from("rp_custom_magic").insert({ campaign_id: campaignId, ...magic, casting_cost: magic.casting_cost as unknown as Record<string, never>, effects: magic.effects as unknown as Record<string, never> });
    if (error) { toast({ title: "Failed to add magic system", variant: "destructive" }); return; }
    toast({ title: "Magic system added" }); await loadAll();
  };

  const updateMagic = async (id: string, updates: Partial<CustomMagic>) => {
    const { casting_cost, effects, ...rest } = updates;
    const payload: Record<string, unknown> = { ...rest };
    if (casting_cost) payload.casting_cost = casting_cost as unknown as Record<string, never>;
    if (effects) payload.effects = effects as unknown as Record<string, never>;
    const { error } = await supabase.from("rp_custom_magic").update(payload).eq("id", id);
    if (error) { toast({ title: "Failed to update magic system", variant: "destructive" }); return; }
    toast({ title: "Magic system updated" }); await loadAll();
  };

  const deleteMagic = async (id: string) => {
    const { error } = await supabase.from("rp_custom_magic").delete().eq("id", id);
    if (error) { toast({ title: "Failed to delete", variant: "destructive" }); return; }
    toast({ title: "Magic system deleted" }); await loadAll();
  };

  const addBelief = async (belief: Omit<CustomBelief, "id" | "campaign_id">) => {
    const { error } = await supabase.from("rp_custom_beliefs").insert({ campaign_id: campaignId, ...belief, rituals: belief.rituals as unknown as Record<string, never>[], divine_powers: belief.divine_powers as unknown as Record<string, never>[] });
    if (error) { toast({ title: "Failed to add belief", variant: "destructive" }); return; }
    toast({ title: "Belief system added" }); await loadAll();
  };

  const updateBelief = async (id: string, updates: Partial<CustomBelief>) => {
    const { rituals, divine_powers, ...rest } = updates;
    const payload: Record<string, unknown> = { ...rest };
    if (rituals) payload.rituals = rituals as unknown as Record<string, never>[];
    if (divine_powers) payload.divine_powers = divine_powers as unknown as Record<string, never>[];
    const { error } = await supabase.from("rp_custom_beliefs").update(payload).eq("id", id);
    if (error) { toast({ title: "Failed to update belief", variant: "destructive" }); return; }
    toast({ title: "Belief system updated" }); await loadAll();
  };

  const deleteBelief = async (id: string) => {
    const { error } = await supabase.from("rp_custom_beliefs").delete().eq("id", id);
    if (error) { toast({ title: "Failed to delete", variant: "destructive" }); return; }
    toast({ title: "Belief system deleted" }); await loadAll();
  };

  const addItem = async (item: Omit<CustomItem, "id" | "campaign_id">) => {
    const { error } = await supabase.from("rp_custom_items").insert({ campaign_id: campaignId, ...item, effects: item.effects as unknown as Record<string, never> });
    if (error) { toast({ title: "Failed to add item", variant: "destructive" }); return; }
    toast({ title: "Item added" }); await loadAll();
  };

  const updateItem = async (id: string, updates: Partial<CustomItem>) => {
    const { effects, ...rest } = updates;
    const payload: Record<string, unknown> = { ...rest };
    if (effects) payload.effects = effects as unknown as Record<string, never>;
    const { error } = await supabase.from("rp_custom_items").update(payload).eq("id", id);
    if (error) { toast({ title: "Failed to update item", variant: "destructive" }); return; }
    toast({ title: "Item updated" }); await loadAll();
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase.from("rp_custom_items").delete().eq("id", id);
    if (error) { toast({ title: "Failed to delete", variant: "destructive" }); return; }
    toast({ title: "Item deleted" }); await loadAll();
  };

  return {
    universeSettings, races, magicSystems, beliefs, items, loading,
    saveUniverseSettings,
    addRace, updateRace, deleteRace,
    addMagic, updateMagic, deleteMagic,
    addBelief, updateBelief, deleteBelief,
    addItem, updateItem, deleteItem,
    refetch: loadAll,
  };
};
