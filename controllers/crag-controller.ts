import { Request, Response } from 'express';
import {
  AddCragRequest,
  ClientApiResponse,
  GetCragListResponse,
  GetCragSingleParam,
  GetOneCragResponse,
  GetSearchParam,
} from '../types';
import { CragRecord } from '../records/crag-record';
import { ValidationError } from '../utils/errors';

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
  });
  // .redirect('/');
};

export const listCrags = async (req: Request, res: Response) => {
  const crags = await CragRecord.getAllCrags();

  res.status(200).json({
    ok: true,
    data: crags,
    status: 200,
  });
  //   res.json({
  //     crags,
  //   });
};

export const getSingleCragById = async (
  req: Request<
    GetCragSingleParam,
    ClientApiResponse<GetOneCragResponse>,
    never
  >,
  res: Response
) => {
  const crag = await CragRecord.getOneCragById(req.params.id);
  res.status(200).json({
    ok: true,
    data: crag,
    status: 200,
  });
};

export const getCragsByName = async (
  req: Request<GetSearchParam, ClientApiResponse<GetCragListResponse>, never>,
  res: Response
) => {
  const crags = await CragRecord.listAllCrags(req.params.name ?? '');

  res.status(200).json({
    ok: true,
    data: crags,
    status: 200,
  });
};

export const updateDetails = async (
  req: Request<GetCragSingleParam, ClientApiResponse<GetOneCragResponse>>,
  res: Response
) => {
  const crag = await CragRecord.getOneCragById(req.params.id);

  if (crag === null) {
    throw new ValidationError('Invalid ID.');
  }
  crag.name = req.body.name;
  crag.description = req.body.description;
  crag.url = req.body.url;
  crag.routes = req.body.routes;
  crag.lat = req.body.lat;
  crag.lon = req.body.lon;

  await crag.updateCragDetails();
  res.status(200).json({
    ok: true,
    data: crag,
    status: 204,
  });

  //   res.json(crag);
};

export const removeCrag = (
  req: Request<GetCragSingleParam, ClientApiResponse<GetOneCragResponse>>,
  res: Response
) => {
  const crag = CragRecord.deleteCrag(req.params.id);

  if (crag === null) {
    throw new ValidationError('Cant find crag with given ID');
  }

  res.status(200).json({
    ok: true,
    data: crag,
    status: 200,
  });
};
