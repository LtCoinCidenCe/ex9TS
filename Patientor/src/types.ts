export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export type Diagnose = {
  code:string;
  name:string;
  latin?:string;
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
};

export type newPatient = Omit<Patient, 'id'>;

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
