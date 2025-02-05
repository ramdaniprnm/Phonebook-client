import React, { useEffect, useState } from "react";

export const OfflineOnline = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []); // Fixed syntax error here - removed extra parenthesis

    return (
        <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            <p>{isOnline ? 'Online' : 'Offline'}</p>
        </div>
    );
};