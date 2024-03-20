import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";

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

const MeetupCreationPage = () => {
    const [classAndArea, setClassAndArea] = useState('');
    const [location, setLocation] = useState('');
    const [meetingType, setMeetingType] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const timeSlots = [
        "10:00 AM - 12:00 PM",
        "1:00 PM - 3:00 PM",
        "4:00 PM - 6:00 PM"
    ];

    const handleClassAndAreaChange = (event) => {
        setClassAndArea(event.target.value);
    };

    const handleLocationChange = (event) => {
        const location = event.target.value;
        setLocation(location);
        // Reset selected room only if location changes
        setRoom('');
        const rooms = fetchRoomsByLocation(location);
        setAvailableRooms(rooms);
    };

    const handleMeetingTypeChange = (event) => {
        setMeetingType(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setTimeSlot(event.target.value);
    };

    const handleRoomChange = (event) => {
        setRoom(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Code to handle meetup creation
        const meetupData = {
            classAndArea: classAndArea,
            location: location,
            room: room,
            //meetingType: meetingType,
            date: date,
            timeSlot: timeSlot,
            userEmail: userEmail
        };

        try {

            //--------------- This is how you grab the current user ---------------
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.user;

            //Kyle added this
            console.log("User email that is being used for create meetup: " + userEmail);

            if (userEmail) {
                const basePath = 'http://localhost:8080';
                const response = await axios.get(`${basePath}/ProfilePage/${userEmail}`);
                setUserEmail(response.data.email_address);
            } else {
                console.error('No email found in localStorage');
            }
        } catch (error) {
            console.error('Error fetching login info:', error);
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/createMeetup",
                {
                    //classAndArea: meetupData.classAndArea,
                    location: meetupData.location,
                    room: meetupData.room,
                    //meetingType: meetupData.meetingType,
                    date: meetupData.date,
                    timeSlot: meetupData.timeSlot,
                    userEmail: meetupData.userEmail
                }
            );

            if (response.status === 200 && response.data.userId) {
                // Your logic here
            }
        } catch (error) {
            console.error("Error during update:", error);
        }
    };

    useEffect(() => {
        if (location) {
            const rooms = fetchRoomsByLocation(location);
            setAvailableRooms(rooms);
        } else {
            setAvailableRooms([]);
        }
    }, [location]);

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
                    <Typography variant="h3" component="h1" gutterBottom style={{textAlign: 'center'}}>
                        Create a Meetup
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            select
                            label="Class(es) or Area(s) of Study"
                            variant="outlined"
                            value={classAndArea}
                            onChange={handleClassAndAreaChange}
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
                            value={location}
                            onChange={handleLocationChange}
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
                            value={room}
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
                            value={date}
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
                            value={timeSlot}
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
                            Create Meetup
                        </Button>
                    </form>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default MeetupCreationPage;