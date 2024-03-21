import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent
} from '@mui/material';
import Navbar from "@/components/Navbar";

const SearchPage = () => {
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);

    const performSearch = () => {
        // Simulated fetching from backend
        const simulatedCourses = [
            { id: 1, name: "Introduction to Programming", description: "Learn the basics of programming", credit: 4, department: "Computer Science" },
            { id: 2, name: "Advanced Mathematics", description: "Dive deep into calculus and algebra", credit: 4, department: "Mathematics" },
            { id: 3, name: "Calculus I", description: "Introduction to differential calculus", credit: 4, department: "Mathematics" },

        ];

        // Replace this with actual search logic based on searchQuery
        setCourses(simulatedCourses);
    };

    const handleJoinCourseStudyGroup = (courseId) => {
        alert(`You have expressed interest in joining a study group for course ID: ${courseId}!`);
        // Implement the logic to actually join a study group or session
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        Find Study Meetups
                    </Typography>

                    <TextField
                        label="Search courses by name, department, etc."
                        variant="outlined"
                        fullWidth
                        style={{ margin: "20px 0" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={performSearch}>
                        Search
                    </Button>

                    {courses.map((course, index) => (
                        <Card key={index} style={{ margin: "20px 0" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">{course.name}</Typography>
                                <Typography color="textSecondary">{course.description}</Typography>
                                <Typography color="textSecondary">{`Credit: ${course.credit} | Department: ${course.department}`}</Typography>
                                <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={() => handleJoinCourseStudyGroup(course.id)}>
                                    Join Study Group
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default SearchPage;