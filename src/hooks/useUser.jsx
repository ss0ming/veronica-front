import { useEffect, useState } from "react";
import { API_ONE_USER } from "../config";

function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(API_ONE_USER)
                if (response && response.data) {
                    setUser(response.data)
                } else {
                    console.log("failed to fetch user data")
                }
            }
            catch (error) {"API 호출 실패 : ", error.message}
        }
        getUser()
    }, [])

    return ({user})
}

export default useUser