import React, { useEffect, useState } from "react";
import { Header, Icon, Button } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { assertNever, Gender, Patient } from "../types";
import { apiBaseUrl } from '../constants';
import EntryDisplay from "../components/EntryDisplay";
import { AddEntryModal, HealthCheckEntryFormValues } from "../AddEntryModal/AddEntryModel";

const PatientInfoPage = () =>
{
  const { id } = useParams<{ id: string }>(); // the generic type is the returned value's type
  const [{ patients }, dispatch] = useStateValue();
  let p: Patient | null = null; // for displaying
  const [notFound, setNotFound] = useState<boolean>(false); // it corrently resets

  // new patient entry
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
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
      closeModal();
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
      <Button onClick={() => openModal()}>Add New Health Check Entry</Button>
      <div>
        {p.entries.map(en => <EntryDisplay key={en.id} entry={en} />)}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
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
