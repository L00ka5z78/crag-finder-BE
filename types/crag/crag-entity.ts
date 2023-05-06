export interface NewCragEntity extends Omit<CragEntity, 'id'> {
  id?: string;
}

export interface CragEntity {
  id?: string;
  name: string;
  description: string;
  url: string;
  lat: number;
  lon: number;
}
