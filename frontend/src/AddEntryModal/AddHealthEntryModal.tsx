import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid, Modal, Segment } from 'semantic-ui-react';
import { NumberField, TextField } from "../AddPatientModal/FormField";

interface ModalProps
{
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
}

export const AddHealthEntryModal = ({ modalOpen, onClose, onSubmit, error }: ModalProps) =>
{
  return <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new health check entry</Modal.Header>
    <Modal.Content>
      {error ? <Segment inverted color="red">{error}</Segment> : null}
      <AddHealthEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>;
};

export type HealthCheckEntryFormValues = {
  healthCheckRating: number;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
};

interface FormProps
{
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

// HealthCheckRatingEntry
const AddHealthEntryForm = ({ onSubmit, onCancel }: FormProps) =>
{
  return (
    <Formik initialValues={{
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: "",
      healthCheckRating: 0
    }}
      onSubmit={onSubmit}
      validate={(values) =>
      {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description)
          errors.description = requiredError;
        if (!values.date)
          errors.date = requiredError;
        if (!values.specialist)
          errors.specialist = requiredError;
        if (![0, 1, 2, 3].includes(values.healthCheckRating))
          errors.healthCheckRating = "Field is invalid";
        return errors;
      }}
    >
      {({ isValid, dirty }) =>
      {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="DiagnosisCodes"
              placeholder="Seperate codes with ,"
              name="diagnosisCodes"
              component={TextField}
            />
            <Field
              label="healthCheckRating"
              placeholder="Health check rating"
              name="healthCheckRating"
              component={NumberField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
