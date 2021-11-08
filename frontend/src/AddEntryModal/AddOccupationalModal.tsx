import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid, Modal, Segment } from 'semantic-ui-react';
import { TextField } from "../AddPatientModal/FormField";

interface ModalProps
{
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalEntryFormValues) => void;
  error?: string;
}

export const AddOccupationalEntryModal = ({ modalOpen, onClose, onSubmit, error }: ModalProps) =>
{
  return <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new occupational healthcare entry</Modal.Header>
    <Modal.Content>
      {error ? <Segment inverted color="red">{error}</Segment> : null}
      <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>;
};

export type OccupationalEntryFormValues = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  employerName: string;
  startDate: string;
  endDate: string;
};

interface FormProps
{
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalEntryForm = ({ onSubmit, onCancel }: FormProps) =>
{
  return (
    <Formik initialValues={{
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: "",
      employerName: "",
      startDate: "",
      endDate: ""
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
        if(!values.employerName)
          errors.employerName = requiredError;
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
              label="Employer's Name"
              placeholder="employer's name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="endDate"
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
