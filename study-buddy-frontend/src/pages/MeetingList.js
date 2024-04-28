import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
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

const MeetingList = () => {
    const [meetingList, setMeetingList] = useState([]);
    const [tutorNames, setTutorNames] = useState({});

    useEffect(() => {
        const getMeetingList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;
                console.log(userId);

                if (userId) {
                    const response = await axios.get(`http://localhost:8080/meetings/user/${userId}/upcoming`);
                    setMeetingList(response.data);
                    console.log(response.data);
                    fetchTutorNames(response.data);

                }

            } catch (error) {
                console.log("Error getting meetings", error)
            }
        }

        const fetchTutorNames = async (meetingListPop) => {
            const names = {};

            for (const meeting of meetingListPop) {
                names[meeting.tutorID] = await handleTutorName(meeting.tutorID);
                console.log(names[meeting.tutorID]);
            }
            setTutorNames(names);
        };

        getMeetingList();
    }, []);

    const handleTutorName = async (tutorID) => {
        if (tutorID != null) {
            try {
                const response = await axios.get(`http://localhost:8080/users/${tutorID}`);
                console.log(response.data);
                return response.data.firstName + " " + response.data.lastName;

            } catch (error) {
                console.log("Error getting tutor", error)
            }
        }
        return "Mock Name";
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
                                                        Location: {meeting.location.name}
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="body1" component="span">
                                                        Date: {meeting.date}
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="body1">
                                                        Time: {meeting.timeSlot}
                                                    </Typography>
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
