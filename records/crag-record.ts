import { CragEntity } from '../types';
import { ValidationError } from '../utils/errors';

export interface NewCragEntity extends Omit<CragEntity, 'id'> {
  id?: string;
}

export class CragRecord implements CragEntity {
  public id: string;
  public name: string;
  public description: string;
  public url: string;
  public lat: number;
  public lon: number;

  constructor(obj: CragEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Crags name can't be empty or longer than 100 characters"
      );
    }
    if (obj.description.length > 1000) {
      throw new ValidationError(
        "Crags description can'tlonger than 1000 characters"
      );
    }
    //@ todo check if url is valid
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError(
        "URL address can't be empty or longer than 100 characters"
      );
    }
    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
      throw new ValidationError('Invalid coordinates');
    }
    this.name = obj.name;
    this.description = obj.description;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }
}
