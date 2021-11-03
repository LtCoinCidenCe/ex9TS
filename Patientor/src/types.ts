type Gender = 'male' | 'female';
export type Diagnose = {
  code:string;
  name:string;
  latin?:string;
};

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
};

export type newPatient = Omit<Patient, 'id'>;

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;
