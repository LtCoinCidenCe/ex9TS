import React, { useEffect, useState } from "react";
import { Header, Icon } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { assertNever, Gender, Patient } from "../types";
import { apiBaseUrl } from '../constants';
import EntryDisplay from "../components/EntryDisplay";

const PatientInfoPage = () =>
{
  const { id } = useParams<{ id: string }>(); // the generic type is the return value's type
  const [{ patients }, dispatch] = useStateValue();
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
      <div>
        {p.entries.map(en => <EntryDisplay key={en.id} entry={en} />)}
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
