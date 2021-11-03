import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.json(patientService.getPatients());
});

export default router;
