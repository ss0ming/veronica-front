import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // 토큰 만료 처리
            localStorage.removeItem('accessToken');
            // 로그인 페이지로 리디렉션
            window.location.href = '/';
            alert('토큰이 만료되었습니다. 다시 로그인해 주세요.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;