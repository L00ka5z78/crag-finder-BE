import { Router } from 'express';
import { CragRecord } from '../records/crag-record';

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
  });
