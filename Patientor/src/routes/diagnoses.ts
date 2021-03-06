import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.json(diagnoseService.getDiagnoses());
});

export default router;
