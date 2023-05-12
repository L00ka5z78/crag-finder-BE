import { Request, Response, Router } from 'express';
import { CragRecord } from '../records/crag-record';
import { ValidationError } from '../utils/errors';
import {
  AddCragRequest,
  ClientApiResponse,
  GetCragListResponse,
  GetCragSingleParam,
  GetOneCragResponse,
  GetSearchParam,
} from '../types';
import {
  addNewCrag,
  getCragsByName,
  getSingleCragById,
  listCrags,
  removeCrag,
  updateDetails,
} from '../controllers/crag-controller';

export const cragRouter = Router();

cragRouter

  .get('/search/:name?', getCragsByName)
  // .get(
  //   '/search/:name?',
  //   async (
  //     req: Request<
  //       GetSearchParam,
  //       ClientApiResponse<GetCragListResponse>,
  //       never
  //     >,
  //     res
  //   ) => {
  //     const crags = await CragRecord.listAllCrags(req.params.name ?? '');

  //     res.status(200).json({
  //       ok: true,
  //       data: crags,
  //       status: 200,
  //     });

  // res.json(crags); // ******************************************************
  //   }
  // )

  .get('/:id', getSingleCragById)

  // .get(
  //   '/:id',
  //   async (
  //     req: Request<
  //       GetCragSingleParam,
  //       ClientApiResponse<GetOneCragResponse>,
  //       never
  //     >,
  //     res
  //   ) => {
  //     const crag = await CragRecord.getOneCragById(req.params.id);
  //     res.status(200).json({
  //       ok: true,
  //       data: crag,
  //       status: 200,
  //     });

  // res.json(crag);  // remember!*******************************************************
  //   }
  // )

  .post('/', addNewCrag)

  // .post(
  //   '/',
  //   async (
  //     req: Request<
  //       never,
  //       ClientApiResponse<GetOneCragResponse>,
  //       AddCragRequest
  //     >,
  //     res
  //   ) => {
  //     const newCrag = new CragRecord(req.body);
  //     await newCrag.createNewCrag();

  //     res.status(201).json({
  //       ok: true,
  //       data: newCrag,
  //       status: 201,
  //     });
  //   }
  // )

  .delete('/delete/:id', removeCrag)
  // .delete('/delete/:id', async (req, res) => {
  //   const crag = CragRecord.deleteCrag(req.params.id);
  //   res.json(crag);
  // })

  .patch('/update/:id', updateDetails)
  // .patch('/update/:id', async (req, res) => {
  //   const crag = await CragRecord.getOneCragById(req.params.id);

  //   if (crag === null) {
  //     throw new ValidationError('Invalid ID.');
  //   }
  //   crag.name = req.body.name;
  //   crag.description = req.body.description;
  //   crag.url = req.body.url;
  //   crag.routes = req.body.routes;
  //   crag.lat = req.body.lat;
  //   crag.lon = req.body.lon;

  //   await crag.updateCragDetails();
  //   res.json(crag);
  // })

  .get('/', listCrags);

// .get('/', async (req, res) => {
//   const crags = await CragRecord.getAllCrags();
//   res.json({
//     crags,
//   });
// });
