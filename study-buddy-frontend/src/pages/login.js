import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthContext";
import { Snackbar, Alert } from '@mui/material';

const Login = () => {

    const router = useRouter();
    const { login } = useAuth();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [user, setUser] = useState(null); // State to store user data
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Define snackbar open state

    // Function to handle Snackbar close event
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                null,
                {
                    params: {
                        email: formData.email,
                        password: formData.password,
                    },
                }
            );

            if (response.status === 200 && response.data.userId) {
                const { userId, firstName, lastName } = response.data;
                localStorage.setItem("isLoggedin", "true");
                localStorage.setItem("userId", userId);
                setUser({ firstName, lastName }); // Set user data
                setLoginSuccess(true);
                setSnackbarMessage('Login successful! Redirecting...');
                setSnackbarOpen(true);

            } else {
                // If status code is not 200, it's handled here.
                setSnackbarMessage("Login was successful but the status code is not 200.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Login failed:", error.response || error);
            setSnackbarMessage('Login failed. Please check your credentials.');
            setSnackbarOpen(true);
        }
        login(); // This should be inside the success block
    };

    useEffect(() => {
        if (loginSuccess) {
            // Fetch additional user data if needed
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8080/user/${localStorage.getItem(
                            "userId"
                        )}`
                    );
                    setUser(response.data); // Set user data
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            };

            fetchUserData();

            // Move redirect inside the block where loginSuccess is set to true
            router.push(`/home`);
        }
    }, [loginSuccess, router]);

    return (
        <div>
            <Navbar showLinks={false} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "100vh" }}
            >
                <Typography variant="h5" gutterBottom>
                    Log In
                </Typography>
                {user && (
                    <Typography variant="body1" gutterBottom>
                        Welcome, {user.firstName} {user.lastName}!
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={loginSuccess ? "success" : "error"} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>
    );
};

export default Login;