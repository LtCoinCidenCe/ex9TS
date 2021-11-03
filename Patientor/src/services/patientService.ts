import { v1 as uuid } from 'uuid';
import { newPatient, NonSensitivePatientData, Patient } from '../types';
import patients from '../../data/patients.json';
import toNewPatientEntry from '../utils';

const patientsData: Patient[] = patients.map(object => {
  const newOne = toNewPatientEntry(object) as Patient;
  newOne.id = object.id;
  return newOne;
});

const getPatients = (): NonSensitivePatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  } as NonSensitivePatientData));
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
  addPatient
};
