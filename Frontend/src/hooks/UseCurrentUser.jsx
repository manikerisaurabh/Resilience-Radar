import React, { useEffect, useState } from "react";

function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        try {
            const currUser = localStorage.getItem("currUser");
            if (currUser) {
                const user = JSON.parse(currUser);
                setCurrentUser(user);
                console.log(user)
            }
        } catch (error) {
            console.log("Error while retrieving data from localStorage", error);
        }
    }, []);

    return currentUser;
}

export default useCurrentUser;
