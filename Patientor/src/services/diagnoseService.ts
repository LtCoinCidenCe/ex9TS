import diagnoses from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};
