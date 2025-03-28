import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MeetingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    attendees: ''
  });
  const [meetLink, setMeetLink] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/meetings/create`,
        {
          ...formData,
          attendees: formData.attendees.split(',').map(email => email.trim())
        }
      );
      setMeetLink(response.data.meetLink);
      setTimeout(() => navigate('/meetings'), 2000);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  return (
    <Box className="form-container">
      <h2>Create New Meeting</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Meeting Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Start Time"
          name="startTime"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Time"
          name="endTime"
          type="datetime-local"
          value={formData.endTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Attendees (comma-separated emails)"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Schedule Meeting
        </Button>
      </form>
      {meetLink && (
        <div className="meet-link">
          <p>Meeting created! Meet link: <a href={meetLink} target="_blank" rel="noopener noreferrer">{meetLink}</a></p>
        </div>
      )}
    </Box>
  );
};

export default MeetingForm;