import React, { useEffect, useState } from "react";
import { Header, Icon, Button } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { assertNever, Gender, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types";
import { apiBaseUrl } from '../constants';
import EntryDisplay from "../components/EntryDisplay";
import { AddHealthEntryModal, HealthCheckEntryFormValues } from "../AddEntryModal/AddHealthEntryModal";
import { AddHospitalEntryModal, HospitalEntryFormValues } from "../AddEntryModal/AddHospitalEntryModal";
import { AddOccupationalEntryModal, OccupationalEntryFormValues } from "../AddEntryModal/AddOccupationalModal";

const PatientInfoPage = () =>
{
  const { id } = useParams<{ id: string }>(); // the generic type is the returned value's type
  const [{ patients }, dispatch] = useStateValue();
  let p: Patient | null = null; // for displaying
  const [notFound, setNotFound] = useState<boolean>(false); // it corrently resets

  // new patient entry
  const [error, setError] = React.useState<string | undefined>();

  const [modalOccupational, setModalOccupational] = React.useState<boolean>(false);
  const openModalOccupational = () => setModalOccupational(true);
  const closeModalOccupational = () => {
    setModalOccupational(false);
    setError(undefined);
  };
  const submitNewOccupationalEntry = async (values: OccupationalEntryFormValues) => {
    try
    {
      const rawCodes = values.diagnosisCodes.replaceAll(' ', '').split(',');
      const modified: Omit<OccupationalHealthcareEntry, 'id'> = {
        specialist: values.specialist,
        date: values.date,
        description: values.description,
        type: "OccupationalHealthcare",
        diagnosisCodes: rawCodes,
        employerName: values.employerName,
        sickLeave: {
          startDate: values.startDate,
          endDate: values.endDate
        }
      };
      const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        modified
      );
      console.log(data);
      dispatch(updatePatient(data));
      closeModalOccupational();
    }
    catch (error: unknown)
    {
      if (axios.isAxiosError(error) && error.response)
      {
        console.error(error.response.data);
        setError(error.response.data);
      }
      else
      {
        setError('Something went wrong.');
      }
    }
  };

  const [modalHospitalOpen, setModalHospitalOpen] = React.useState<boolean>(false);
  const openModalHospital = () => setModalHospitalOpen(true);
  const closeModalHospital = () => {
    setModalHospitalOpen(false);
    setError(undefined);
  };
  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) =>
  {
    try
    {
      const rawCodes = values.diagnosisCodes.replaceAll(' ', '').split(',');
      const modified: Omit<HospitalEntry, 'id'> = {
        specialist: values.specialist,
        date: values.date,
        description: values.description,
        type: "Hospital",
        diagnosisCodes: rawCodes,
        discharge: { date: values.dischargeDate, criteria: values.dischargeCriteria }
      };
      const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        modified
      );
      console.log(data);
      dispatch(updatePatient(data));
      closeModalHospital();
    }
    catch (error: unknown)
    {
      if (axios.isAxiosError(error) && error.response)
      {
        console.error(error.response.data);
        setError(error.response.data);
      }
      else
      {
        setError('Something went wrong.');
      }
    }
  };


  const [modalHealthyCheckOpen, setModalHealthyCheckOpen] = React.useState<boolean>(false);
  const openModalHealthyCheck = (): void => setModalHealthyCheckOpen(true);

  const closeModalHealthyCheck = (): void => {
    setModalHealthyCheckOpen(false);
    setError(undefined);
  };

  const submitNewHealthEntry = async (values: HealthCheckEntryFormValues) => {
    try
    {
      const rawCodes = values.diagnosisCodes.replaceAll(' ', '').split(',');
      const modified = { ...values, type: "HealthCheck", diagnosisCodes: rawCodes };
      const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        modified
      );
      console.log(data);
      dispatch(updatePatient(data));
      closeModalHealthyCheck();
    }
    catch (error: unknown) {
      if(axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        setError(error.response.data);
      }
      else {
        setError('Something went wrong.');
      }
    }
  };
  // new patient entry end

  if (Object.prototype.hasOwnProperty.call(patients, id))
  {
    // there is the patient's entry loaded by app
    const element = patients[id];
    if (element.ssn)
    {
      // it is ready, no request
      p = element;
    }
  }

  const effectHook = (): void =>
  {
    if (p === null && notFound === false)
    {
      console.log('axios');
      axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then(({ data }) =>
        {
          // console.log('update');
          dispatch(updatePatient(data));
        })
        .catch((e: AxiosError) =>
        {
          if (e.response?.status === 404)
            setNotFound(true);
        })
        .catch((e: Error) =>
        {
          console.log(e);
        });
    }
  };
  useEffect(effectHook, [id]);

  const genderToIcon = (gender: Gender) =>
  {
    switch (gender)
    {
      case Gender.Male:
        return 'mars';
        break;
      case Gender.Female:
        return 'venus';
        break;
      case Gender.Other:
        return 'transgender';
        break;
      default:
        assertNever(gender);
        break;
    }
  };

  if (p)
  {
    return <div>
      <Header as="h2">{p.name} <Icon name={genderToIcon(p.gender)} /></Header>
      <div>birthday: {p.dateOfBirth}</div>
      <div>ssn: {p.ssn}</div>
      <div>occupation: {p.occupation}</div>
      <Header as="h3">entries</Header>

      <Button onClick={() => openModalHealthyCheck()}>Add New Health Check Entry</Button>
      <Button onClick={() => openModalHospital()}>Add New Hospital Entry</Button>
      <Button onClick={() => openModalOccupational()}>Add New Occupational Modal Entry</Button>

      <div>
        {p.entries.map(en => <EntryDisplay key={en.id} entry={en} />)}
      </div>
      <AddHealthEntryModal
        modalOpen={modalHealthyCheckOpen}
        onSubmit={submitNewHealthEntry}
        error={error}
        onClose={closeModalHealthyCheck}
      />
      <AddHospitalEntryModal
        modalOpen={modalHospitalOpen}
        onSubmit={submitNewHospitalEntry}
        error={error}
        onClose={closeModalHospital}
      />
      <AddOccupationalEntryModal
        modalOpen={modalOccupational}
        onSubmit={submitNewOccupationalEntry}
        error={error}
        onClose={closeModalOccupational}
      />
    </div>;
  }
  else if (notFound)
  {
    return <div>not found</div>;
  }
  else
  {
    return null;
  }
};

export default PatientInfoPage;
