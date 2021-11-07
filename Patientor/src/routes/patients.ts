import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.json(patientService.getPatients());
});

router.get('/:id', (request, response) => {
  const p = patientService.getOnePatient(request.params.id);
  if (!p) return response.status(404).end();
  else return response.json(p);
});

router.post('/', (request, response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(request.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    return response.json(addedEntry);
  }
  catch (error: unknown) {
    if (error instanceof Error)
      return response.status(400).send(error.message);
    return response.status(400).end();
  }
});

export default router;
