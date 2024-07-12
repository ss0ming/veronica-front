import "../style/components/Dropdown.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_LOGOUT } from "../config";

function Dropdown() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰을 가져옴

            await axios.post(API_LOGOUT,  {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            localStorage.removeItem('accessToken');
            navigate('/');
        } catch (error) {
            console.error('로그아웃 에러:', error);
        }
    };

    return (
        <div className="Dropdown">
            <div className="Dropdown-wrapper">
                <Link className="dropdown-menu" to="/user/update">회원정보수정</Link>
                <Link className="dropdown-menu" to="/user/password">비밀번호수정</Link>
                <button className="dropdown-menu" onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
}

export default Dropdown;
