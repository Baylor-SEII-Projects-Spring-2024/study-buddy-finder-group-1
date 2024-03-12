
import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthContext";

const Login = () => {

    const router = useRouter();
    const { login } = useAuth();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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

                const user = response.data;
                localStorage.setItem('user', JSON.stringify({user: formData.email}));
                console.log('search here', JSON.stringify(user));
                setLoginSuccess(true);
                setSnackbarMessage('Login successful! Redirecting...');
                setOpenSnackbar(true);
                login(); // Update auth context or perform additional login steps
            } else {
                setSnackbarMessage("Login was successful but the status code is not 200.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Login failed:", error.response || error);
            setSnackbarMessage('Login failed. Please check your credentials.');
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        if (loginSuccess) {
            router.push(`/home`);
        }
    }, [loginSuccess, router]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={loginSuccess ? "success" : "error"} onClose={() => setOpenSnackbar(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;