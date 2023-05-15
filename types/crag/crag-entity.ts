export interface SimpleCragEntity {
  id?: string;
  lat: number;
  lon: number;
}

export interface CragEntity extends SimpleCragEntity {
  // id?: string;
  name: string;
  description: string;
  url: string;
  routes: number;
}
export interface NewCragEntity extends Omit<CragEntity, 'id'> {
  id?: string;
}
