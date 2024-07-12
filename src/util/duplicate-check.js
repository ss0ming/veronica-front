import axios from 'axios';
import { API_DUPLICATE_EMAIL, API_DUPLICATE_NICKNAME } from '../config';

export const checkEmailDuplicate = async (email) => {
    try {
        const response = await axios.post(API_DUPLICATE_EMAIL, { email });

        if (response.data.data === "OK") {
            return false;
        } else if (response.data.data === "DUPLICATE") {
            return true;
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            return true;
        }
        console.log("이메일 중복 API 에러: ", error);
        return false;
    }
};

export const checkNicknameDuplicate = async (nickname) => {
    try {
        const response = await axios.post(API_DUPLICATE_NICKNAME, { nickname });

        if (response.data.data === "OK") {
            return false;
        } else if (response.data.data === "DUPLICATE") {
            return true;
        }
        
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            return true;
        }
        console.log("닉네임 중복 API 에러: ", error);
        return false;
    }
};
