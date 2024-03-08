import React, { useState } from 'react';
import { Box, Container, Typography, FormControlLabel, Switch, Button, Divider, TextField, Select, MenuItem, FormControl, InputLabel, Slider } from '@mui/material';
import Navbar from "@/components/Navbar";

const Settings = () => {
    const [notification, setNotification] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const [fontSize, setFontSize] = useState(16);
    const [autoSave, setAutoSave] = useState(true);
    const [themeColor, setThemeColor] = useState('Blue');
    const [emailNotification, setEmailNotification] = useState(true);
    const [timeFormat, setTimeFormat] = useState('12-hour');

    const handleNotificationChange = () => {
        setNotification(prevState => !prevState);
    };

    const handleDarkModeChange = () => {
        setDarkMode(prevState => !prevState);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleFontSizeChange = (event, newValue) => {
        setFontSize(newValue);
    };

    const handleAutoSaveChange = () => {
        setAutoSave(prevState => !prevState);
    };

    const handleThemeColorChange = (event) => {
        setThemeColor(event.target.value);
    };

    const handleEmailNotificationChange = () => {
        setEmailNotification(prevState => !prevState);
    };

    const handleTimeFormatChange = (event) => {
        setTimeFormat(event.target.value);
    };

    //Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Container maxWidth="md" style={{ marginTop: '250px' }}>
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Settings
                    </Typography>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Notification Settings
                        </Typography>
                        <Divider />
                        <FormControlLabel
                            control={<Switch checked={notification} onChange={handleNotificationChange} />}
                            label="Enable Notifications"
                        />
                        <FormControlLabel
                            control={<Switch checked={emailNotification} onChange={handleEmailNotificationChange} />}
                            label="Email Notifications"
                        />
                    </Box>
                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                            Appearance
                        </Typography>
                        <Divider />
                        <FormControlLabel
                            control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
                            label="Dark Mode"
                        />
                        <Box mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="language-label">Language</InputLabel>
                                <Select
                                    labelId="language-label"
                                    id="language-select"
                                    value={language}
                                    onChange={handleLanguageChange}
                                    label="Language"
                                >
                                    <MenuItem value="English">English</MenuItem>
                                    <MenuItem value="Spanish">Spanish</MenuItem>
                                    <MenuItem value="French">French</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <Typography variant="body1" gutterBottom>
                                Font Size
                            </Typography>
                            <Slider
                                value={fontSize}
                                onChange={handleFontSizeChange}
                                aria-labelledby="font-size-slider"
                                step={1}
                                min={12}
                                max={24}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="theme-color-label">Theme Color</InputLabel>
                                <Select
                                    labelId="theme-color-label"
                                    id="theme-color-select"
                                    value={themeColor}
                                    onChange={handleThemeColorChange}
                                    label="Theme Color"
                                >
                                    <MenuItem value="Blue">Blue</MenuItem>
                                    <MenuItem value="Green">Green</MenuItem>
                                    <MenuItem value="Red">Red</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                            Miscellaneous
                        </Typography>
                        <Divider />
                        <FormControlLabel
                            control={<Switch checked={autoSave} onChange={handleAutoSaveChange} />}
                            label="Auto Save Changes"
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="time-format-label">Time Format</InputLabel>
                            <Select
                                labelId="time-format-label"
                                id="time-format-select"
                                value={timeFormat}
                                onChange={handleTimeFormatChange}
                                label="Time Format"
                            >
                                <MenuItem value="12-hour">12-hour</MenuItem>
                                <MenuItem value="24-hour">24-hour</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={3} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Settings;
