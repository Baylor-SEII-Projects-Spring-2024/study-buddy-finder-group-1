import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button,
    Container,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";
import {useRouter} from "next/router";


const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    baseURL: 'http://34.16.179.242:8080', // Replace this with your backend server URL

    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
    // Other default configuration options can be added here
});

const MeetingList = () => {
    const [meetingList, setMeetingList] = useState([]);
    const [tutorNames, setTutorNames] = useState({});
    const [meetingOver, setMeetingOver] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getMeetingList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;
                console.log(userId);

                if (userId) {
                    const response = await axiosInstance.get(`user/${userId}`);
                    const updatedMeetingList = await Promise.all(meetingList.map(async (meeting) => {
                        const users = await getUsersByMeetingId(meeting.id);
                        return { ...meeting, users };
                    }));
                    setMeetingList(response.data);

                    console.log(response.data);
                    fetchTutorNames(response.data);
                    fetchMeetingOver(response.data);
                }

            } catch (error) {
                console.log("Error getting meetings", error)
            }
        }

        // Function to fetch users by meeting ID
        const getUsersByMeetingId = async (meetingId) => {
            try {
                const response = await axiosInstance.get(`/user/${meetingId}`);
                return response.data; // Assuming the response is a list of Optional<User>
            } catch (error) {
                console.error('Error fetching users:', error);
                return []; // Return an empty array if there's an error
            }
        };

        const fetchTutorNames = async (meetingListPop) => {
            const names = {};

            for (const meeting of meetingListPop) {
                names[meeting.tutorID] = await handleTutorName(meeting.tutorID);
                console.log(names[meeting.tutorID]);
            }
            setTutorNames(names);
        };

        const fetchMeetingOver = async (meetingListPop) => {
            const over = {};

            for (const meeting of meetingListPop) {
                over[meeting.id] = await isMeetingOver(meeting.id);
                console.log(over[meeting.id]);
            }
            setMeetingOver(over);
        };

        getMeetingList();
    }, []);

    const handleTutorName = async (tutorID) => {
        if (tutorID != null) {
            try {
                const response = await axiosInstance.get(`/users/${tutorID}`);
                console.log(response.data);
                return response.data.firstName + " " + response.data.lastName;

            } catch (error) {
                console.log("Error getting tutor", error)
            }
        }
        return "Mock Name";
    };

    const isMeetingOver = async (meetingId) => {
        try {
            const response = await axiosInstance.get(`/meetings/over/${meetingId}`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log("Error getting is meeting over", error)
        }
    }

    const handleReviewTutor = (meeting) => {
        //store meeting id for review page
        localStorage.setItem('meetingId', JSON.stringify(meeting.id));

        router.push(`/MeetingList/${meeting.tutorID}`);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Navbar showLinks={false} />
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Your Meetups
                    </Typography>
                    <Paper elevation={3}>
                        <List>
                            {meetingList.map((meeting, index) => (
                                <div key={meeting.id}>
                                    <ListItem button alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={index+1} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(index+1)}&background=random`} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                                    {`${meeting.courseName} | ${tutorNames[meeting.tutorID] || 'Loading...'}`}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography variant="body1" component="span">
                                                        Location: {meeting.location.name} | {meeting.room}
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="body1" component="span">
                                                        Date: {meeting.date}
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="body1">
                                                        Time: {meeting.timeSlot}
                                                    </Typography>
                                                    {meetingOver[meeting.id] && (
                                                        <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => handleReviewTutor(meeting)}>
                                                            Review this Tutor
                                                        </Button>
                                                    )}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default MeetingList;
