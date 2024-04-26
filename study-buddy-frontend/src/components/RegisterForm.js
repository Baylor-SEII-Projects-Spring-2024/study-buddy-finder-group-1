import React, { useState } from 'react';
import { Button, Container, TextField, Typography, MenuItem, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from "axios";

import { useRouter } from "next/router";

export const dynamic = 'force-dynamic' // defaults to auto


export async function GET(request) {
    return new Response('Hello, Next.js!', {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}
export default function RegisterForm() {
    const [emailError, setEmailError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const router = useRouter(); // Corrected usage of useRouter()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
    });

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        uppercase: false,
        specialChar: false,
        number: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "password") {
            updatePasswordCriteria(value);
            if (formData.confirmPassword) {
                checkPasswordMatch(value, formData.confirmPassword);
            }
        } else if (name === "confirmPassword") {
            checkPasswordMatch(formData.password, value);
        }

        if (name === "email") {
            validateEmail(value);
        }
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        const match = password === confirmPassword;
        setPasswordMatchError(!match);
    };

    const validateEmail = (email) => {
        const isValid = email.endsWith('@baylor.edu');
        setEmailError(!isValid);
        return isValid;
    };

    const updatePasswordCriteria = (password) => {
        setPasswordCriteria({
            minLength: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            number: /\d/.test(password)
        });
    };
    const isPasswordValid = () => {
        return passwordCriteria.minLength && passwordCriteria.uppercase && passwordCriteria.specialChar && passwordCriteria.number;
    };

    const canSubmit = () => {
        return !emailError && isPasswordValid() && !passwordMatchError;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!canSubmit()) {
            alert('Please ensure your password meets all criteria.');
            return;
        }

        // Password validation, check to ensure both passwords are the same
        if (formData.confirmPassword !== formData.password) {
            setValidationMessage('Passwords do not match.');
            return; // Stop the form submission
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email_address: formData.email,
                password: formData.password,
                userType: formData.userType
            })
            const data = response.data;
            console.log(data);
            if (response.status === 200) {
                await router.push('/login');
            } else {
                console.log("Registration was successful but the status code is not 200.");
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 20, mb: 4 }}>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
                Create Account
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="fname"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                    error={emailError}
                    helperText={emailError ? "Email must end with @baylor.edu" : ""}
                    sx={{ mb: 2 }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <List sx={{ mb: 2 }}>
                    <ListItem>
                        <ListItemIcon>
                            {passwordCriteria.minLength ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}
                        </ListItemIcon>
                        <ListItemText primary="At least 8 characters" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            {passwordCriteria.uppercase ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}
                        </ListItemIcon>
                        <ListItemText primary="At least one uppercase letter" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            {passwordCriteria.specialChar ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}
                        </ListItemIcon>
                        <ListItemText primary="At least one special character" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            {passwordCriteria.number ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}
                        </ListItemIcon>
                        <ListItemText primary="At least one number" />
                    </ListItem>
                </List>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={passwordMatchError}
                    helperText={passwordMatchError ? "Passwords do not match" : ""}
                    sx={{ mb: 2 }}
                />
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    name="userType"
                    label="You are a..."
                    id="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Tutor">Tutor</MenuItem>
                </TextField>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isPasswordValid() || formData.confirmPassword !== formData.password}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </form>
        </Container>
    );
}