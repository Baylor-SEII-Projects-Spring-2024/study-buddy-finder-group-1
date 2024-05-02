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

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    baseURL: 'http://34.125.60.1:8080', // Replace this with backend server URL
    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
});

const EditMeetupPage = () => {
    const [userRooms, setUserRooms] = useState([]);
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

    useEffect(() => {
        const fetchUserMeetings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                const response = await axiosInstance.get(`/meetings/user/${userId}`)
                setUserRooms(response.data);
                console.log(response.data)
            } catch (error) {
                console.log("Error: ", error)
            }
        }
        fetchUserMeetings();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const payload = {
            locationId: locationInput,
            room: selectedRoom,
            date: selectedDate,
            timeSlot: selectedTimeSlot,
        };

        console.log(payload)

        try {

            const response = await axiosInstance.put(`/meetings/${selectedMeetupId}`, payload);
            console.log('Meeting updated successfully:', response.data);

        } catch (error) {
            console.error('Error updating meeting:', error);

        }
    };

    useEffect(() => {

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
                            {userRooms.map((userRoom) => (
                                <MenuItem key={userRoom.id} value={userRoom.id}>
                                    {/* Display a combination of location name, date, and time slot as a string */}
                                    {`${userRoom.location.name}: ${userRoom.date} @ ${userRoom.timeSlot}`}
                                </MenuItem>
                            ))}
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