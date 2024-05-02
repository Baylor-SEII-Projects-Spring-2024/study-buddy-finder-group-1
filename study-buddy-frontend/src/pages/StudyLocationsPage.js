import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    //baseURL: 'http://34.16.179.242:8080', // Replace this with your backend server URL
    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
});

const StudyLocationsPage = () => {

    // Custom styles for the text to match the StudyBuddies title font and to fill up more of the page
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
        padding: '40px 0', // Increase padding to give more space.
        fontSize: '1.4rem'
    };

    // Descriptions for each study location
    const studyLocationsDescription = (
        <div>
            <div>
                {/* Moody Library Description */}
                <h2>Moody Library</h2>
                <p>
                    Moody Library offers modern study spaces and a vast collection of resources for research and collaboration.
                    Amenities include quiet study areas, group rooms, computer labs, and a coffee shop.
                </p>
            </div>

            <br /> {/* Add spacing between locations */}

            <div>
                {/* Baylor Science Building Description */}
                <h2>Baylor Science Building</h2>
                <p>
                    The Baylor Science Building provides state-of-the-art facilities for hands-on learning and scientific
                    inquiry. Students have access to advanced labs and specialized equipment across various disciplines.
                </p>
            </div>

            <br /> {/* Add spacing between locations */}

            <div>
                {/* Student Union Building Description */}
                <h2>Student Union Building</h2>
                <p>
                    The Student Union Building (SUB) offers a variety of study spaces and amenities, including quiet lounges
                    and group rooms, making it an ideal destination for focused study sessions.
                </p>
            </div>

            <br /> {/* Add spacing between locations */}

            <div>
                {/* Armstrong Library Description */}
                <h2>Armstrong Library</h2>
                <p>
                    Armstrong Library houses a rich collection of resources in humanities and social sciences. Comfortable
                    reading areas and knowledgeable librarians enhance the study experience for students.
                </p>
            </div>
        </div>
    );

    return (
        <div>
            <Navbar showLinks={false} /> {/* Inserting navbar */}

            {/* Flex container to center content */}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{textAlign: 'center', paddingBottom: '20px'}}>
                        Study Locations
                    </Typography>

                    {/* Inserting descriptions for study locations */}
                    {studyLocationsDescription}
                </Container>
            </Box>

            {/* Add spacing between main content and footer */}
            <Box height={100} /> {/* Adjust height as needed for spacing */}

        </div>
    );
};

export default StudyLocationsPage;