import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Navbar from "@/components/Navbar";

const locations = [
    "Moody Library",
    "Baylor Science Building",
    "Student Union Building",
    "Armstrong Library"
];

const MeetupCreationPage = () => {
    const [classAndAreaInput, setClassAndAreaInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [meetingType, setMeetingType] = useState('group');

    const handleClassAndAreaInputChange = (event) => {
        setClassAndAreaInput(event.target.value);
    };

    const handleLocationInputChange = (event) => {
        setLocationInput(event.target.value);
    };

    const handleMeetingTypeChange = (event) => {
        setMeetingType(event.target.value);
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
                            label="Class or Area(s) of Study"
                            variant="outlined"
                            value={classAndAreaInput}
                            onChange={handleClassAndAreaInputChange}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
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
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Meeting Type</FormLabel>
                            <RadioGroup
                                row
                                aria-label="meetingType"
                                name="meetingType"
                                value={meetingType}
                                onChange={handleMeetingTypeChange}
                            >
                                <FormControlLabel value="group" control={<Radio />} label="Group Meeting" />
                                <FormControlLabel value="one-on-one" control={<Radio />} label="One-on-One Meeting" />
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
