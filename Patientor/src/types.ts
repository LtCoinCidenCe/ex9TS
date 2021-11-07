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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
  
}

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
