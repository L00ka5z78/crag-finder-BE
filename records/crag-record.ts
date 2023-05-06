import { CragEntity } from '../types';

interface NewCragEntity extends Omit<CragEntity, 'id'> {
  id?: string;
}

export class CragRecord implements CragEntity {
  public id: string;
  public name: string;
  public description: string;
  public url: string;
  public lat: number;
  public lon: number;

  constructor(obj: CragEntity) {}
}
