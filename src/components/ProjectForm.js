import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const ProjectSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  technologies: Yup.string().required('Required'),
  imageUrl: Yup.string().url('Invalid URL').required('Required'),
  projectUrl: Yup.string().url('Invalid URL'),
  githubUrl: Yup.string().url('Invalid URL'),
});

const ProjectForm = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {initialValues._id ? 'Edit Project' : 'Add New Project'}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={ProjectSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="title" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="description" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="technologies"
                  label="Technologies (comma separated)"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="technologies" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="imageUrl"
                  label="Image URL"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="imageUrl" component="div" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="projectUrl"
                  label="Project URL"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="projectUrl" component="div" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="githubUrl"
                  label="GitHub URL"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="githubUrl" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default ProjectForm;
