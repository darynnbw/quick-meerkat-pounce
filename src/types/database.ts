export type Equipment = {
  id: string;
  user_id: string;
  name: string;
  type: 'cold_holding' | 'freezer' | 'hot_holding';
  safe_min: number | null;
  safe_max: number | null;
  location: string | null;
  created_at: string;
};

export type Log = {
  id: string;
  equipment_id: string;
  user_id: string;
  temperature: number;
  logged_at: string;
  corrective_action: string | null;
  notes: string | null;
  out_of_range: boolean;
  created_at: string;
};