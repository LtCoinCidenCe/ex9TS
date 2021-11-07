import React from "react";
import { Segment, Icon, Header } from "semantic-ui-react";
import { useStateValue } from "../state";
import { assertNever, Entry, HealthCheckRating } from "../types";

  const typeToIcon = (type: Entry["type"]) =>
  {
    switch (type)
    {
      case "HealthCheck":
        return 'user md';
      case "Hospital":
        return 'hospital outline';
      case "OccupationalHealthcare":
        return 'stethoscope';
      default:
        assertNever(type);
    }
  };
  
  const ratingToColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return 'red';
        case HealthCheckRating.HighRisk:
        return 'orange';
        case HealthCheckRating.LowRisk:
        return 'yellow';
        case HealthCheckRating.Healthy:
        return 'green';
      default:
        assertNever(rating);
    }
  };

const EntryDisplay = ({ entry }: { entry: Entry }) =>
{
  const diagnosisCodes = () => {
    return <ul>
      {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
    </ul>;
  };
  
  const [{ diagnoses }] = useStateValue();
  switch (entry.type)
  {
    case "HealthCheck":
      return <Segment>
        <Header>{entry.date}<Icon name={typeToIcon(entry.type)}/></Header>
        <p><i>{entry.description}</i></p>
        <Icon name="heart" color={ratingToColor(entry.healthCheckRating)} />
        {diagnosisCodes()}
      </Segment>;
    case "Hospital":
      return <Segment>
        <Header>{entry.date}<Icon name={typeToIcon(entry.type)}/></Header>
        <p><i>{entry.description}</i></p>
        <div style={{ fontWeight: "bold" }}>discharge: {entry.discharge.date} {entry.discharge.criteria}</div>
        {diagnosisCodes()}
      </Segment>;
    case "OccupationalHealthcare":
      return <Segment>
        <Header>{entry.date}<Icon name={typeToIcon(entry.type)}/></Header>
        <div style={{ fontWeight: "bold" }}>employer: {entry.employerName}</div>
        <p><i>{entry.description}</i></p>
        {diagnosisCodes()}
      </Segment>;
    default:
      assertNever(entry);
      return null;
  }
};

export default EntryDisplay;
