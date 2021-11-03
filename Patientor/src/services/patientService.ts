import { v1 as uuid } from 'uuid';
import { newPatient, NonSensitivePatientData } from '../types';
import patients from '../../data/patients.json';

const patientsData = patients;

const getPatients = (): NonSensitivePatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  } as NonSensitivePatientData));
};

const addPatient = ({ name, dateOfBirth, ssn, gender, occupation }: newPatient) => {
  const id = uuid();
  const newPatient = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };
  
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};
