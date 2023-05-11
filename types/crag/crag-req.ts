import { CragEntity } from './crag-entity';

export type AddAdRequest = Omit<CragEntity, 'id'>;

export interface GetCragSingleParam {
  id: string;
}
export interface GetSearchParam {
  name?: string;
}
