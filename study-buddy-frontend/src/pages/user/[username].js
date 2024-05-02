import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Head from "next/head";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace this with backend server URL
    //baseURL: 'http://34.125.65.178:8080', // Replace this with backend server URL
    timeout: 5000, //Set a timeout for requests (in milliseconds)
});

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = getUserIdFromPath();
                console.log(userId);
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);

            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const getUserIdFromPath = () => {
        const path = window.location.pathname;
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '84px' }}>
        <Head>
                <title>ProfilePage - Study Buddies</title>
                {/* Links to import fonts */}
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

            <Navbar />
            <>
                {loading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div>
                        <h1>User Profile</h1>
                        <p>User ID: {user.id}</p>
                        <p>Email Address: {user.email_address}</p>
                        <p>First name: {user.firstName}</p>
                        <p>Last name: {user.lastName}</p>
                        <p>User type: {user.userType}</p>
                    </div>
                ) : (
                    <p>User not found.</p>
                )}
            </>
        </div>
    );
}

export default UserProfile;