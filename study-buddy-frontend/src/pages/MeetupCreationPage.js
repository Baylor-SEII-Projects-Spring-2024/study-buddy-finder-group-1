import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import Navbar from "@/components/Navbar";

const MeetupCreationPage = () => {
    const [classInput, setClassInput] = useState('');
    const [areaOfStudyInput, setAreaOfStudyInput] = useState('');

    const handleClassInputChange = (event) => {
        setClassInput(event.target.value);
    };

    const handleAreaOfStudyInputChange = (event) => {
        setAreaOfStudyInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Code to handle meetup creation
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
                            label="Class"
                            variant="outlined"
                            value={classInput}
                            onChange={handleClassInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Area of Study"
                            variant="outlined"
                            value={areaOfStudyInput}
                            onChange={handleAreaOfStudyInputChange}
                            fullWidth
                            margin="normal"
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
