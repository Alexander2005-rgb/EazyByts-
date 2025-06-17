import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: '' });
    try {
      await axios.post('/api/contact', formData);
      setStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ success: false, message: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>Contact Me</Typography>
      {status.message && (
        <Alert severity={status.success ? 'success' : 'error'} sx={{ mb: 2 }}>
          {status.message}
        </Alert>
      )}
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Send
      </Button>
    </Box>
  );
}
