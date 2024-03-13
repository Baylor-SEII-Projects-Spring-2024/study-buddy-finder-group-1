import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Navbar from "@/components/Navbar";


const locations = [
    "Moody Library",
    "Baylor Science Building",
    "Student Union Building",
    "Armstrong Library"
];

const mockClasses = [
    "Mathematics",
    "Computer Science",
    "Biology",
    "History",
    "Literature",
    // Can add more mock classes as needed
];

const EditMeetupPage = () => {
    const [selectedMeetupId, setSelectedMeetupId] = useState('');
    const [classAndAreaInput, setClassAndAreaInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [meetingType, setMeetingType] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

    const timeSlots = [
        "10:00 AM - 12:00 PM",
        "1:00 PM - 3:00 PM",
        "4:00 PM - 6:00 PM"
    ];

    const handleMeetupSelectChange = (event) => {
        setSelectedMeetupId(event.target.value);
        // Fetch and set meetup details based on the selected meetup ID
        // Here you might want to fetch meetup details from your backend API
    };

    const handleClassAndAreaInputChange = (event) => {
        setClassAndAreaInput(event.target.value);
    };

    const handleLocationInputChange = (event) => {
        const location = event.target.value;
        setLocationInput(location);
        // Reset selected room only if location changes
        setSelectedRoom('');
        const rooms = fetchRoomsByLocation(location);
        setAvailableRooms(rooms);
    };

    const handleMeetingTypeChange = (event) => {
        setMeetingType(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handleRoomChange = (event) => {
        setSelectedRoom(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Code to handle meetup update
        const meetupData = {
            id: selectedMeetupId, // Include the selected meetup ID for identification
            classAndArea: classAndAreaInput,
            location: locationInput,
            room: selectedRoom,
            meetingType: meetingType,
            date: selectedDate,
            timeSlot: selectedTimeSlot
        };
        console.log(meetupData);
    };

    useEffect(() => {
        // Fetch meetup details based on the selectedMeetupId
        // Here you might want to fetch meetup details from your backend API
        // Update classAndAreaInput, locationInput, selectedRoom, selectedDate, selectedTimeSlot, and meetingType accordingly
    }, [selectedMeetupId]);

    const fetchRoomsByLocation = (location) => {
        // Mock function to fetch rooms based on location
        const mockRooms = [
            "Room 101",
            "Room 102",
            "Room 103"
        ];
        return mockRooms;
    };

    // Generate date options from the current day forward
    const generateDateOptions = () => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 7; i++) { //Goes up to a week ahead
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
        }
        return dates;
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom style={{ textAlign: 'center' }}>
                        Edit Meetup
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            select
                            label="Select Meetup"
                            variant="outlined"
                            value={selectedMeetupId}
                            onChange={handleMeetupSelectChange}
                            fullWidth
                            margin="normal"
                        >
                            {/* You may dynamically populate this dropdown with user's meetups */}
                            <MenuItem value="1">Meetup 1</MenuItem>
                            <MenuItem value="2">Meetup 2</MenuItem>
                        </TextField>

                        <Typography variant="h5" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: '40px' }}>
                            Changes to be Made:
                        </Typography>

                        <TextField
                            select
                            label="Class(es) or Area(s) of Study"
                            variant="outlined"
                            value={classAndAreaInput}
                            onChange={handleClassAndAreaInputChange}
                            fullWidth
                            margin="normal"
                        >
                            {mockClasses.map((classItem) => (
                                <MenuItem key={classItem} value={classItem}>
                                    {classItem}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Location"
                            value={locationInput}
                            onChange={handleLocationInputChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        >
                            {locations.map((location) => (
                                <MenuItem key={location} value={location}>
                                    {location}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Available Rooms"
                            value={selectedRoom}
                            onChange={handleRoomChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        >
                            {availableRooms.map((room) => (
                                <MenuItem key={room} value={room}>
                                    {room}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Date"
                            variant="outlined"
                            value={selectedDate}
                            onChange={handleDateChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            {generateDateOptions().map((date) => (
                                <MenuItem key={date} value={date}>
                                    {date}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Time Slot"
                            value={selectedTimeSlot}
                            onChange={handleTimeSlotChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        >
                            {timeSlots.map((slot) => (
                                <MenuItem key={slot} value={slot}>
                                    {slot}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Meeting Type</FormLabel>
                            <RadioGroup
                                row
                                aria-label="meetingType"
                                name="meetingType"
                                value={meetingType}
                                onChange={handleMeetingTypeChange}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <FormControlLabel value="group-tutor" control={<Radio />} label="Group Meeting with Tutor" />
                                    <FormControlLabel value="one-on-one-tutor" control={<Radio />} label="One-on-One Meeting with Tutor" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <FormControlLabel value="group-study-buddies" control={<Radio />} label="Group Meeting with Study Buddies" />
                                    <FormControlLabel value="one-on-one-study-buddy" control={<Radio />} label="One-on-One Meeting with Study Buddy" />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Edit Meetup
                        </Button>
                    </form>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default EditMeetupPage;