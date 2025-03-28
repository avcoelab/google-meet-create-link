import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/meetings`);
        setMeetings(response.data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="list-container">
      <h2>Scheduled Meetings</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>Meet Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting._id}>
                <TableCell>{meeting.title}</TableCell>
                <TableCell>{new Date(meeting.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(meeting.endTime).toLocaleString()}</TableCell>
                <TableCell>{meeting.attendees.map(a => a.email).join(', ')}</TableCell>
                <TableCell>
                  <a href={meeting.meetLink} target="_blank" rel="noopener noreferrer">
                    Join Meeting
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default MeetingList;