import { Router } from 'express';
import { CragRecord } from '../records/crag-record';
import { ValidationError } from '../utils/errors';
import { addNewCrag } from '../controllers/crag-controller';

export const cragRouter = Router();

cragRouter
  .get('/search/:name?', async (req, res) => {
    const crags = await CragRecord.listAllCrags(req.params.name ?? '');

    res.json(crags);
  })

  .get('/:id', async (req, res) => {
    const crag = await CragRecord.getOneCragById(req.params.id);
    res.json(crag);
  })

  .post('/', addNewCrag)

  .delete('/delete/:id', async (req, res) => {
    const crag = CragRecord.deleteCrag(req.params.id);
    res.json(crag);
  })

  .patch('/update/:id', async (req, res) => {
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
    res.json(crag);
  })

  .get('/', async (req, res) => {
    const crags = await CragRecord.getAllCrags();
    res.json({
      crags,
    });
  });
