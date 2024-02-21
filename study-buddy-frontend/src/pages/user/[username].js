import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <div>
                    <h1>User Profile</h1>
                    <p>User ID: {user.id}</p>
                    <p>Email Address: {user.emailAddress}</p>
                    <p>User Type: {user.userType}</p>
                </div>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}

export default UserProfile;
