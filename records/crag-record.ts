import { FieldPacket } from 'mysql2';
import { CragEntity, NewCragEntity, SimpleCragEntity } from '../types';
import { pool } from '../utils/connectDb';
import { ValidationError } from '../utils/errors';

type CragRecordResults = [CragEntity[], FieldPacket[]];

export class CragRecord implements CragEntity {
  public id: string;
  public name: string;
  public description: string;
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

  //   static async listAllCrags(name: string): Promise<SimpleCragEntity[]> {
  static async listAllCrags(name: string): Promise<CragRecord[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `crags` WHERE `name` LIKE :search',
      {
        search: `%${name}`,
      }
    )) as CragRecordResults;

    // return results.map((result) => {
    //   const { id, lat, lon } = result;
    //   return { id, lat, lon };
    // });
    return results.map((result) => new CragRecord(result));
  }

  async createNewCrag(): Promise<void> {
    try {
      await pool.execute(
        'INSERT INTO `crags`(`id`, `name`, `description`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :url, :lat, :lon);',
        this
      );
    } catch (e) {
      throw new ValidationError('This id is in our database!');
    }
  }
}
