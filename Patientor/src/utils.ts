import { v1 as uuid } from 'uuid';
import diagnoseService from './services/diagnoseService';
import { Entry, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, newPatient, OccupationalHealthcareEntry } from "./types";

const isString = (text: unknown): text is string =>
{
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string =>
{
  if (!name || !isString(name))
    throw new Error('Incorrect or missing name');
  return name;
};

const isDate = (date: string): boolean =>
{
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string =>
{
  if (!date || !isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date: ' + date);
  return date;
};

const parseSSN = (ssn: unknown): string =>
{
  if (!ssn || !isString(ssn))
    throw new Error('Incorrect or missing SSN');
  return ssn;
};

const parseOccupation = (occupation: unknown): string =>
{
  if (!occupation || !isString(occupation))
    throw new Error('Incorrect or missing occupation');
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender =>
{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender =>
{
  if (!gender || !isGender(gender))
    throw new Error('Incorrect or missing date: ' + gender);
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
// handles the transformation, also handles exception inside
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): newPatient =>
{
  const newEntry: newPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

const parseDescription = (description: unknown): string =>
{
  if (!description || !isString(description))
    throw new Error('Incorrect or missing description');
  return description;
};

const parseSpecialist = (specialist: unknown): string =>
{
  if (!specialist || !isString(specialist))
    throw new Error('Incorrect or missing specialist');
  return specialist;
};


const allValues = diagnoseService.getDiagnoses();
const codes = allValues.map(d => d.code);
const isDiagnosisCode = (DC: unknown): DC is string =>
{
  if (DC && isString(DC))
    return codes.includes(DC);
  throw new Error('Incorrect diagnosis code');
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined =>
{
  if (diagnosisCodes && Array.isArray(diagnosisCodes))
  {
    if (diagnosisCodes.every(isDiagnosisCode))
      return diagnosisCodes;
  }
  return undefined;
};

const parseEntryType = (type: unknown): Entry["type"] =>
{
  if (type === "Hospital" || type === "OccupationalHealthcare" || type === "HealthCheck")
    return type;
  throw new Error('Incorrect entry type');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthRating = (rating: any): rating is HealthCheckRating =>
{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return [0,1,2,3].includes(rating); // another weird problem
};

const parseHealthRating = (rating: unknown): HealthCheckRating =>
{
  if (isHealthRating(rating)) // can not include 0
    return rating;
  throw new Error('Incorrect health check rating');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): HospitalEntry["discharge"] =>
{
  if (typeof discharge.date !== 'undefined' && typeof discharge.criteria !== 'undefined')
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const date = discharge.date; const criteria = discharge.criteria;
    if (isString(date))
      if (isDate(date))
        if (isString(criteria))
          return discharge as HospitalEntry["discharge"];
  }
  throw new Error('Incorrect discharge');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): OccupationalHealthcareEntry["sickLeave"] =>
{
  if (typeof sickLeave.startDate !== 'undefined' && typeof sickLeave.endDate !== 'undefined')
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const s = sickLeave.startDate; const e = sickLeave.endDate;
    if (isString(s) && isString(e))
      if (isDate(s) && isDate(e))
        return sickLeave as OccupationalHealthcareEntry['sickLeave'];
  }
  return undefined;
};

type newEntryField = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,
  type: unknown,
  healthCheckRating: unknown,
  discharge: unknown,
  employerName: unknown,
  sickLeave: unknown
};

const toNewDEntry = ({ description, date, specialist, diagnosisCodes, type, healthCheckRating, discharge, employerName, sickLeave }: newEntryField): Entry =>
{
  const t = parseEntryType(type);
  const newEntry = {
    id: uuid(),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };

  switch (t)
  {
    case "HealthCheck":
      const ne1: HealthCheckEntry = { ...newEntry, healthCheckRating: parseHealthRating(healthCheckRating), type: t };
      return ne1;
      break;
    case "Hospital":
      const ne2: HospitalEntry = { ...newEntry, type: t, discharge: parseDischarge(discharge) };
      return ne2;
      break;
    case "OccupationalHealthcare":
      const ne3: OccupationalHealthcareEntry = { ...newEntry, type: t, employerName: parseName(employerName), sickLeave: parseSickLeave(sickLeave) };
      return ne3;
      break;
  }
};

export { toNewPatientEntry, toNewDEntry };
