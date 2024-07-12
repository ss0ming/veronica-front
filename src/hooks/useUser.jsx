import { useEffect, useState } from "react";
import { API_ONE_USER } from "../config";

function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.log("No access token found");
                    return;
                }

                const response = await fetch(API_ONE_USER, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.log("failed to fetch user data");
                }
            } catch (error) {
                console.error("API 호출 실패: ", error.message);
            }
        };
        getUser();
    }, []);

    return { user };
}

export default useUser;
