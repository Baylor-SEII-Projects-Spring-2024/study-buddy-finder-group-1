import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel, Select, OutlinedInput, Chip, Snackbar
} from '@mui/material';
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
    const [locations, setLocations] = useState([]);
    const [meetingType, setMeetingType] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [location, setLocation] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const timeSlots = [
        "10:00 AM - 12:00 PM",
        "1:00 PM - 3:00 PM",
        "2:00 PM - 4:00 PM",
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

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedFriends(
            // on autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const fetchLocations = async () => {
            const basePath = 'http://localhost:8080';
            try {
                const response = await axios.get(`${basePath}/locations`);
                setLocations(response.data); // Assuming response.data is an array of location objects
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);


        //     //Kyle added this
        //     console.log("User email that is being used for create meetup: " + userEmail);
        //
        //     if (userEmail) {
        //         const basePath = 'http://localhost:8080';
        //         const response = await axios.get(`${basePath}/ProfilePage/${userEmail}`);
        //         setUserEmail(response.data.email_address);
        //     } else {
        //         console.error('No email found in localStorage');
        //     }
        // } catch (error) {
        //     console.error('Error fetching login info:', error);
        // }

    useEffect(() => {
        const getFriendsList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                if (userId) {
                    const basePath = 'http://localhost:8080';
                    const response = await axios.get(`${basePath}/friendships/${userId}/friends`);
                    setFriendsList(response.data);
                    console.log(response.data);
                }

            } catch (error) {
                console.log("Error", error)
            }
        }
        getFriendsList();
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
            setUserEmail(user.email);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const basePath = 'http://localhost:8080';
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        console.log(userId);

        // Ensure you are sending 'userIds' and 'userId' in your payload
        const payload = {
            locationId: location,
            room: room,
            date: date,
            timeSlot: timeSlot,
            userIds: selectedFriends.map(id => parseInt(id)), // Ensure IDs are integers
            userId: userId, // Make sure this matches the expected key in the backend
        };

        console.log(payload);

        try {
            const response = await axios.post(`${basePath}/meetings/create`, payload);

            if (response.status === 200) {
                console.log("Meeting created successfully", response.data);
                setOpenSnackbar(true);
                setSnackbarMessage("Meeting successfully created!");
            }
        } catch (error) {
            console.error("Error creating meeting:", error);
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

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
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
                                <MenuItem key={location.id} value={location.id}>
                                    {location.name}
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
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="friends-select-label">Select Friends</InputLabel>
                            <Select
                                labelId="friends-select-label"
                                id="friends-select"
                                multiple
                                value={selectedFriends}
                                onChange={handleSelectChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Select Friends" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const friend = friendsList.find(friend => friend.id === value);
                                            if (!friend) return null;

                                            const initials = `${friend.firstName[0]}${friend.lastName[0]}`;

                                            const chipStyle = {
                                                backgroundColor: friend.userType === 'Tutor' ? 'yellow' : 'blue',
                                                color: 'black',
                                            };

                                            return (
                                                <Chip
                                                    key={value}
                                                    label={initials.toUpperCase()}
                                                    style={chipStyle}
                                                />
                                            );
                                        })}
                                    </Box>
                                )}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 224,
                                            width: 250,
                                        },
                                    },
                                }}
                            >
                                {friendsList.map((friend) => (
                                    <MenuItem
                                        key={friend.id}
                                        value={friend.id}
                                    >
                                        {friend.firstName} {friend.lastName} with a role of: {friend.userType}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                            message={snackbarMessage}
                            ContentProps={{
                                style: {
                                    backgroundColor: 'green', // You can customize this as needed
                                },
                            }}
                        />
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