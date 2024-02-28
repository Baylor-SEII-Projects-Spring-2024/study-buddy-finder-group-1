import {Button, Container, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";


export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

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
                password : formData.password
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