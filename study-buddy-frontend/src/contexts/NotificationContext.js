import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notificationCount, setNotificationCount] = useState(0);

    const value = {
        notificationCount,
        setNotificationCount,
    };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}