import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import Navbar from "@/components/Navbar";

const TEMPLATEPAGE = () => {

    //Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    return (
        <div>

            <Navbar showLinks={false} />

            <Box display = "flex" flexDirection = "column" justifyContent = "center" alignItems = "center" style = {{minHeight: '80vh', paddingTop: '15vh'}}>
                <Container maxWidth = "md" style = {textStyle}>
                    <Typography variant = "h3" component = "h1" gutterBottom style = {{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        [Insert main content here]
                    </Typography>
                </Container>
            </Box>
            <Box height = {100} />

        </div>
    );
};

export default TEMPLATEPAGE;