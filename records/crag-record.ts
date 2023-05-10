import { FieldPacket } from 'mysql2';
import { CragEntity, NewCragEntity, SimpleCragEntity } from '../types';
import { pool } from '../utils/connectDb';
import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';

type CragRecordResults = [CragEntity[], FieldPacket[]];

export class CragRecord implements CragEntity {
  public id: string;
  public name: string;
  public description: string;
  public routes: number;
  public url: string;
  public lat: number;
  public lon: number;

  constructor(obj: NewCragEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Crags name can't be empty or longer than 100 characters"
      );
    }
    if (obj.description.length > 1000) {
      throw new ValidationError(
        "Crags description can't be longer than 1000 characters"
      );
    }

    if (obj.routes < 0 || obj.routes > 9999) {
      throw new ValidationError('Routes count has to be between 0 - 9 999');
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
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.routes = obj.routes;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async getOneCragById(id: string): Promise<CragRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `crags` WHERE `id` = :id',
      {
        id,
      }
    )) as CragRecordResults;
    return results.length === 0 ? null : new CragRecord(results[0]);
  }

  static async listAllCrags(name: string): Promise<SimpleCragEntity[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `crags` WHERE `name` LIKE :search',
      {
        search: `%${name}%`,
      }
    )) as CragRecordResults;

    return results.map((result) => {
      const { id, lat, lon } = result;
      return { id, lat, lon };
    });
  }

  static async getAllCrags() {
    const [results] = (await pool.execute(
      'SELECT * from `crags` ORDER BY `name` ASC'
    )) as CragRecordResults;
    return results.map((obj) => new CragRecord(obj));
  }

  async createNewCrag(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error('This id is in our database!');
    }
    await pool.execute(
      'INSERT INTO `crags`(`id`, `name`, `description`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :url, :lat, :lon)',
      this
    );
  }

  static deleteCrag(id: string) {
    pool.execute('DELETE FROM `crags` WHERE `id` = :id', {
      id,
    });
  }

  async updateCragDetails(): Promise<void> {
    await pool.execute(
      'UPDATE `crags` SET `name` = :name, `description` = :description, `url` = :url, `lat` = :lat, `lon` = :lon WHERE `id` = :id',
      {
        id: this.id,
        name: this.name,
        description: this.description,
        url: this.url,
        lat: this.lat,
        lon: this.lon,
      }
    );
  }
}
