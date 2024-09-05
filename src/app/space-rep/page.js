'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TextField, Button, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import YouTubeIcon from '@mui/icons-material/YouTube';
import path from 'path';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#303030', paper: '#424242' },
  },
});

const dataFilePath = path.join(process.cwd(), 'data', 'topics.json');

export default function SpaceRepPage() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  useEffect(() => {
    const storedTopics = localStorage.getItem('spaceRepTopics');
    if (storedTopics) {
      const parsedTopics = JSON.parse(storedTopics);
      if (parsedTopics.length > 0) {
        setTopics(parsedTopics.map(topic => ({
          ...topic,
          date1: new Date(topic.date1),
          date2: new Date(topic.date2)
        })));
      }
    }
  }, []);
  
  
  useEffect(() => {
    const storedTopics = localStorage.getItem('spaceRepTopics');
    console.log('Raw stored topics:', storedTopics);
    
    if (storedTopics) {
      try {
        const parsedTopics = JSON.parse(storedTopics);
        console.log('Parsed topics:', parsedTopics);
        
        const formattedTopics = parsedTopics.map(topic => ({
          ...topic,
          date1: new Date(topic.date1),
          date2: new Date(topic.date2)
        }));
        console.log('Formatted topics:', formattedTopics);
        
        setTopics(formattedTopics);
      } catch (error) {
        console.error('Error parsing stored topics:', error);
      }
    } else {
      console.log('No stored topics found');
    }
  }, []);
  
  
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem('spaceRepTopics', JSON.stringify(topics));
    }
  }, [topics]);
  
  

  const handleAddTopic = () => {
    if (newTopic && selectedDate1 && selectedDate2) {
      const newTopicObj = {
        id: Date.now(),
        name: newTopic,
        date1: selectedDate1,
        date2: selectedDate2,
        revised1: false,
        revised2: false
      };
      console.log('Adding new topic:', newTopicObj);
      setTopics(prevTopics => {
        const updatedTopics = [...prevTopics, newTopicObj];
        console.log('Updated topics:', updatedTopics);
        return updatedTopics;
      });
      setNewTopic('');
      setSelectedDate1(null);
      setSelectedDate2(null);
    }
  };
  
  
  

  const handleCheckboxChange = (id, dateNum) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, [`revised${dateNum}`]: !topic[`revised${dateNum}`] } : topic
    ));
  };

  const handleDeleteTopic = (id) => {
    setTopics(topics.filter(topic => topic.id !== id));
  };

  const handleYouTubeSearch = () => {
    window.open('https://www.youtube.com/results?search_query=spaced+repetition', '_blank');
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="container mx-auto p-8 bg-gray-800 min-h-screen text-gray-200 relative">
          <Button
            variant="contained"
            startIcon={<YouTubeIcon />}
            onClick={handleYouTubeSearch}
            className="absolute top-4 right-4"
          >
            Learn About Spaced Repetition
          </Button>
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Space Repetition Planner</h1>
          <div className="mb-6 flex flex-wrap gap-4 justify-center">
            <TextField
              label="New Topic"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              variant="outlined"
              className="bg-gray-700"
            />
            <DatePicker
              label="First Review Date"
              value={selectedDate1}
              onChange={(date) => setSelectedDate1(date)}
              renderInput={(params) => <TextField {...params} variant="outlined" className="bg-gray-700" />}
            />
            <DatePicker
              label="Second Review Date"
              value={selectedDate2}
              onChange={(date) => setSelectedDate2(date)}
              renderInput={(params) => <TextField {...params} variant="outlined" className="bg-gray-700" />}
            />
            <Button variant="contained" onClick={handleAddTopic} className="h-14">Add Topic</Button>
          </div>
          <TableContainer component={Paper} className="shadow-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-900">
                  <TableCell className="font-bold text-gray-200">Topic</TableCell>
                  <TableCell className="font-bold text-gray-200">First Review Date</TableCell>
                  <TableCell className="font-bold text-gray-200">Revised</TableCell>
                  <TableCell className="font-bold text-gray-200">Second Review Date</TableCell>
                  <TableCell className="font-bold text-gray-200">Revised</TableCell>
                  <TableCell className="font-bold text-gray-200">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.map((topic) => (
                  <TableRow key={topic.id} className={topic.id % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                    <TableCell>{topic.name}</TableCell>
                    <TableCell>{topic.date1.toDateString()}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={topic.revised1}
                        onChange={() => handleCheckboxChange(topic.id, 1)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{topic.date2.toDateString()}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={topic.revised2}
                        onChange={() => handleCheckboxChange(topic.id, 2)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteTopic(topic.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
