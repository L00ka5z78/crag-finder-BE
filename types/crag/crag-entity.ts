export interface NewCragEntity extends Omit<CragEntity, 'id'> {
  id?: string;
}

export interface SimpleCragEntity {
  id?: string;
  lat: number;
  lon: number;
}

export interface CragEntity extends SimpleCragEntity {
  id?: string;
  name: string;
  description: string;
  url: string;
  lat: number;
  lon: number;
}
