import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid, Modal, Segment } from 'semantic-ui-react';
import { TextField } from "../AddPatientModal/FormField";

interface ModalProps
{
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}

export const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: ModalProps) =>
{
  return <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital check entry</Modal.Header>
    <Modal.Content>
      {error ? <Segment inverted color="red">{error}</Segment> : null}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>;
};

export type HospitalEntryFormValues = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  dischargeDate: string;
  dischargeCriteria: string;
};

interface FormProps
{
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

const AddHospitalEntryForm = ({ onSubmit, onCancel }: FormProps) =>
{
  return (
    <Formik initialValues={{
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: "",
      dischargeDate: "",
      dischargeCriteria: ""
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
        if (!values.dischargeDate)
          errors.dischargeDate = requiredError;
        if (!values.dischargeCriteria)
          errors.dischargeCriteria = requiredError;
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
              label="Diagnosis Codes"
              placeholder="Seperate codes with ,"
              name="diagnosisCodes"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria"
              name="dischargeCriteria"
              component={TextField}
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

