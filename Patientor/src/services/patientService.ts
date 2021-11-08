import { v1 as uuid } from 'uuid';
import { newPatient, Patient, PublicPatient } from '../types';
import patients from '../../data/patients';

// raw variable, full information
const patientsData: Patient[] = patients;

// method
const getPatients = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  } as PublicPatient));
};

// method
const getOnePatient = (id:string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
};

const addPatient = (newPerson: newPatient) => {
  // this parameter newPerson should be trusted
  const id = uuid();
  const newPatient = {
    id,
    ...newPerson
  };
  
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getOnePatient,
  addPatient
};
