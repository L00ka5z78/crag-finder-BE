import { Router } from 'express';
import { CragRecord } from '../records/crag-record';
import { ValidationError } from '../utils/errors';

export const cragRouter = Router()
  .get('/search/:name?', async (req, res) => {
    const crags = await CragRecord.listAllCrags(req.params.name ?? '');

    res.json(crags);
  })

  .get('/:id', async (req, res) => {
    const crag = await CragRecord.getOneCragById(req.params.id);
    res.json(crag);
  })

  .post('/', async (req, res) => {
    const newCrag = new CragRecord(req.body);
    await newCrag.createNewCrag();
    res.json(newCrag);
  })

  .delete('/delete/:id', async (req, res) => {
    const crag = CragRecord.deleteCrag(req.params.id);
    res.json(crag);
  })

  .patch('/update/:id', async (req, res) => {
    // const {body}: {
    //     body: SetCompletedForTask,
    // } = req;

    const crag: CragRecord = await CragRecord.getOneCragById(req.params.id);

    if (crag === null) {
      throw new ValidationError('Invalid ID.');
    }
    crag.name = req.body.name;
    crag.description = req.body.description;
    crag.url = req.body.url;
    crag.lat = req.body.lat;
    crag.lon = req.body.lon;

    await crag.updateCragDetails();
    res.json(crag);
  });
