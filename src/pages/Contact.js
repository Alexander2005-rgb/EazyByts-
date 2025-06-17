import React from 'react';
import ContactForm from '../components/ContactForm';
import { Container } from '@mui/material';

export default function Contact() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <ContactForm />
    </Container>
  );
}
