export interface SensorData {
  created_at: string;
  entry_id: number;
  field1: string; // temperature
  field2: string; // humidity
  field3: string; // smokeLevel
  field4: string; // voltage
}

export interface Channel {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  created_at: string;
  updated_at: string;
  last_entry_id: number;
}

export interface ApiResponse {
  channel: Channel;
  feeds: SensorData[];
}