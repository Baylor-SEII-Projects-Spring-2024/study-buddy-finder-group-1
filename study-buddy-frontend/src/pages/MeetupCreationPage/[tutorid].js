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
import { useRouter } from 'next/router';
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
];
const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with backend server URL
    baseURL: 'http://34.125.60.1:8080', // Replace this with backend server URL
    timeout: 5000, //Set a timeout for requests (in milliseconds)
});

const MeetupCreationPage = () => {
    const [subject, setSubject] = useState('');
    const [locations, setLocations] = useState([]);
    const [meetingType, setMeetingType] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [selectedUsers, setselectedUsers] = useState([]);
    const [location, setLocation] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [tutor,setTutor] = useState(null);
    const [automatic,setAutomatic] = useState(true);
    const [tutorCourses, setTutorCourses] = useState([]);
    const router = useRouter();
    const { tutorid } = router.query;

    const timeSlots = [
        "10:00 AM - 12:00 PM",
        "1:00 PM - 3:00 PM",
        "2:00 PM - 4:00 PM",
        "4:00 PM - 6:00 PM",
        "5:00 PM - 7:00 PM",
        "6:00 PM - 8:00 PM",
    ];

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleLocationChange = (event) => {
        const location = event.target.value;
        setLocation(location);
        // Reset selected room only if location changes
        setRoom('');
        const rooms = fetchRoomsByLocation(location);
        setAvailableRooms(rooms);
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

    /*to automatically parse tutor information*/
    useEffect(() => {
        const fetchTutor = async () => {
            const basePath = 'http://localhost:8080';
            try {
                const response = await axiosInstance.get(`/tutors/${tutorid}`);
                setTutor(response.data); // Assuming response.data is an array of location objects
                console.log(" test: "  + tutorid);
            } catch (error) {
                console.error("Error fetching tutor:", error);
            }
        };
        fetchTutor();
    }, []);

    useEffect(() => {
        const fetchTutorCourses = async () => {
            const basePath = 'http://localhost:8080';
            try {
                console.log(`${basePath}/tutors/${tutorid}/courses`)
                const response = await axiosInstance.get(`/tutors/${tutorid}/courses`);
                setTutorCourses(response.data);

            } catch (error) {
                console.log("Error fetching tutor courses:", error);
            }
        }
        fetchTutorCourses();
    }, []);

    /*gets user for meetup creation*/
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
            setUserEmail(user.email);
        }
    }, []);

    /*FIXME: no longer needed but keep just incase*/
    useEffect(() => {
        setAutomatic(true);
    }, []);


    /*USED FOR FETCHING LOCATIONS automatically as page is made*/
    useEffect(() => {
        const fetchLocations = async () => {
            const basePath = 'http://localhost:8080';
            try {
                const response = await axiosInstance.get(`/locations`);
                setLocations(response.data); // Assuming response.data is an array of location objects
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const basePath = 'http://localhost:8080';
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        console.log(userId);

        // Ensure we are sending 'userIds' and 'userId' in payload
        const payload = {
            locationId: location,
            room: room,
            date: date,
            timeSlot: timeSlot,
            userIds: selectedUsers.map(id => parseInt(id)), // Ensure IDs are integers
            userId: userId, // Make sure this matches the expected key in the backend
            subject: subject,
            tutorID: tutorid
        };

        console.log(payload);

        try {
            const response = await axiosInstance.post(`/meetings/create`, payload);

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
                    {tutor && (
                        <Typography variant="h3" component="h1" gutterBottom style={{ textAlign: 'center' }}>
                            Create a Meetup!
                            <div style={{ fontSize: 20 }}>
                                Tutor: {tutor.firstName} {tutor.lastName}
                            </div>
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            select
                            label="Subject"
                            variant="outlined"
                            value={subject}
                            onChange={handleSubjectChange}
                            fullWidth
                            margin="normal"
                            disabled={tutorCourses.length === 0} // Disable if no courses available
                        >
                            {tutorCourses.length > 0 ? (
                                tutorCourses.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>
                                        {course.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled value="">
                                    Tutor currently has no subjects to tutor
                                </MenuItem>
                            )}
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


                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                            message={snackbarMessage}
                            ContentProps={{
                                style: {
                                    backgroundColor: 'green',
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