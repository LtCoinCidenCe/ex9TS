import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.json(patientService.getPatients());
});

router.post('/', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = request.body;
  const newPatient = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
  return response.json(newPatient);
});

export default router;
