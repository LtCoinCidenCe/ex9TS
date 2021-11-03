import { Gender, newPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error('Incorrect or missing name');
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date: ' + date);
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn))
    throw new Error('Incorrect or missing SSN');
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error('Incorrect or missing occupation');
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender))
    throw new Error('Incorrect or missing date: ' + gender);
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
// handles the transformation, also handles exception inside
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): newPatient => {
  const newEntry: newPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };
  
  return newEntry;
};

export default toNewPatientEntry;
