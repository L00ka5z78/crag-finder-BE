import { Request, Response } from 'express';
import { CragRecord } from '../records/crag-record';
import {
  AddCragRequest,
  ClientApiResponse,
  GetCragListResponse,
  GetCragSingleParam,
  GetOneCragResponse,
  GetSearchParam,
} from '../types';

export const addNewCrag = async (
  req: Request<never, ClientApiResponse<GetOneCragResponse>, AddCragRequest>,
  res: Response
) => {
  const newCrag = new CragRecord(req.body);
  await newCrag.createNewCrag();
  res.status(201).json({
    ok: true,
    data: newCrag,
    status: 201,
  }); // doesnt redirect anywhere, shows form with given input. Fix on FE side

  //   res.json(newCrag); // redirects to succes message
};

export const searchByName = async (
  req: Request<GetSearchParam, ClientApiResponse<GetCragListResponse>, never>,
  res: Response
) => {
  const crags = await CragRecord.listAllCrags(req.params.name ?? '');

  res.status(200).json({
    ok: true,
    data: crags,
    status: 200,
  });

  //   res.json(crags);
};

export const getById = async (
  req: Request<
    GetCragSingleParam,
    ClientApiResponse<GetOneCragResponse>,
    never
  >,
  res: Response
) => {
  const crag = await CragRecord.getOneCragById(req.params.id);
  res.json(crag);
};
