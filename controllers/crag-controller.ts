import { Request, Response } from 'express';
import { CragRecord } from '../records/crag-record';
import {
  ClientApiResponse,
  GetCragListResponse,
  GetSearchParam,
} from '../types';

export const addNewCrag = async (
  req: Request<GetSearchParam, ClientApiResponse<GetCragListResponse>>,
  res: Response
) => {
  const newCrag = new CragRecord(req.body);
  await newCrag.createNewCrag();
  res.json(newCrag);
};
