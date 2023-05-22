import { Router } from 'express';
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
  .get('/:id', getSingleCragById)
  .post('/', addNewCrag)
  .delete('/delete/:id', removeCrag)
  .patch('/update/:id', updateDetails)
  .get('/', listCrags);
