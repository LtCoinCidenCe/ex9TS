import React, { useEffect, useState } from "react";
import { Header, Icon } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Gender, Patient } from "../types";
import { apiBaseUrl } from '../constants';

const PatientInfoPage = () =>
{
  const { id } = useParams<{ id: string }>(); // the generic type is the return value's type
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  let p: Patient | null = null; // for displaying
  const [notFound, setNotFound] = useState<boolean>(false); // it corrently resets

  // console.log('notFound:',notFound);

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

  const toIcon = (gender: Gender) =>
  {
    switch (gender)
    {
      case "male":
        return 'mars';
        break;
      case "female":
        return 'venus';
        break;
      case "other":
        return 'transgender';
        break;
    }
  };

  if (p)
  {
    return <div>
      <Header as="h2">{p.name} <Icon name={toIcon(p.gender)} /></Header>
      <div>birthday: {p.dateOfBirth}</div>
      <div>ssn: {p.ssn}</div>
      <div>occupation: {p.occupation}</div>
      <Header as="h3">entries</Header>
      <div>
        {p.entries.map(en =>
        (<div key={en.id}>
          <div>{en.date} {en.description}</div>
          <ul>
            {en.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
          </ul>
        </div>))
        }
      </div>
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
