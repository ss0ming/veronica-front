import { useEffect, useState } from "react";
import { API_ONE_USER, API_USER_IMAGE } from "../config";

function useUser() {
    const [user, setUser] = useState(null);
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.log("No access token found");
                    return;
                }

                // 유저정보
                const userResponse = await fetch(API_ONE_USER, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                    console.log(userData)
                } else {
                    console.log("Failed to fetch user data");
                }

                // 유저이미지
                const imageResponse = await fetch(API_USER_IMAGE, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (imageResponse.ok) {
                    const imageData = await imageResponse.json();
                    setUserImage(imageData.image); // 서버에서 보내주는 이미지 데이터의 키에 맞춰서 변경
                    console.log(imageResponse)
                } else {
                    console.log("Failed to fetch user image");
                }


            } catch (error) {
                console.error("API 호출 실패: ", error.message);
            }
        };
        getUser();
    }, []);

    return { user, userImage };
}

export default useUser;
