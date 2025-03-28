import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import MeetingForm from './components/MeetingForm';
import MeetingList from './components/MeetingList';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Google Meet Scheduler</h1>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/meetings/create" element={<MeetingForm />} />
          <Route path="/meetings" element={<MeetingList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;