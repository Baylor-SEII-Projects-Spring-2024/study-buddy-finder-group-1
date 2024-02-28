import {Button, Container, TextField, Typography, MenuItem} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {router} from "next/client";


export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
    });
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isRegistered) {
            router.push('/login');
        }
    }, [isRegistered, router]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/register", {
                firstName: formData.firstName,
                lastName : formData.lastName,
                email_address : formData.email,
                password : formData.password,
                userType : formData.userType
            })
            const data = response.data;
            console.log(data);
            if (response.status === 200) {

                router.push('/login');
            } else {
                console.log("Registration was successful but the status code is not 200.");
            }

        } catch (error) {
            console.log("Error: ", error)
        }
    };

    return (
        <div style={{ flexGrow: 1 }}>
            <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
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
                        value={formData.email}
                        onChange={handleChange}
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
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        margin="normal"
                        required
                        fullWidth
                        name="userType"
                        label="You are a..."
                        type="option"
                        id="choose-option"
                        autoComplete="choose-option"
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
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: 'primary', // This makes the button blue
                            '&:hover': {
                                backgroundColor: 'darkred', // Darker red on hover
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </form>
            </Container>
        </div>
    );
}