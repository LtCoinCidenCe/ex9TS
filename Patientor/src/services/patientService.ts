import { NonSensitivePatientData } from '../types';
import patients from '../../data/patients.json';

const getPatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  } as NonSensitivePatientData));
};

export default {
  getPatients
};
