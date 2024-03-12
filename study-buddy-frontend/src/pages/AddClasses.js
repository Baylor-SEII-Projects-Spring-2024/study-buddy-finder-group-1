import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import Navbar from "@/components/Navbar";

const AddClasses = () => {
    const [className, setClassName] = useState('');
    const [areaOfStudy, setAreaOfStudy] = useState('');

    const handleClassNameChange = (event) => {
        setClassName(event.target.value);
    };

    const handleAreaOfStudyChange = (event) => {
        setAreaOfStudy(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Code to handle adding/editing classes or areas of study
    };

    return (
        <div>
            <Navbar showLinks={false} />

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom style={{textAlign: 'center'}}>
                        Add Class(es) or Area(s) of Study
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Class Name"
                            variant="outlined"
                            value={className}
                            onChange={handleClassNameChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Area of Study"
                            variant="outlined"
                            value={areaOfStudy}
                            onChange={handleAreaOfStudyChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </form>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default AddClasses;