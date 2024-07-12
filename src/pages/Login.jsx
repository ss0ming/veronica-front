import "../style/pages/Login.css";
import Header from "../components/Header";
import InfoInput from "../components/InfoInput";
import { PurpleLongBtn, NoStyleButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../util/validator";
import useValidation from "../hooks/useValidation";
import axios from "axios";
import { API_LOGIN } from "../config";

function Login() {
    const nav = useNavigate();

    const {
        value: email,
        helperMsg: emailHelperMsg,
        helperStyle: emailHelperStyle,
        isValid: isEmailValid,
        handleChange: handleEmailChange
    } = useValidation("", validateEmail);

    const {
        value: password,
        helperMsg: passwordHelperMsg,
        helperStyle: passwordHelperStyle,
        isValid: isPasswordValid,
        handleChange: handlePasswordChange
    } = useValidation("", validatePassword);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isEmailValid && isPasswordValid) {
            try {
                const response = await axios.post(API_LOGIN, {
                    email: email,
                    password: password
                });

                if (response.status === 200) {
                    const accessToken = response.data.data.token;

                    if (accessToken) {
                        localStorage.setItem("accessToken", accessToken);
                        alert("로그인 성공");
                        setTimeout(() => {
                            nav('/posts');
                        }, 1000);
                    } else {
                        alert("토큰 없음");
                    }
                } else {
                    alert("로그인 실패");
                }
            } catch (error) {
                console.error("로그인 요청 중 에러가 발생했습니다:", error);
                alert("로그인 요청 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        } else {
            console.log("유효하지 않은 입력값이 있습니다.");
        }
    }

    return (
        <>
            <Header showBackButton={false} showCircleButton={false} />
            <form id="loginForm" onSubmit={handleFormSubmit}>
                <div className="title">로그인</div>
                <InfoInput
                    title="이메일"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={handleEmailChange}
                    helperMsg={emailHelperMsg}
                    helperStyle={emailHelperStyle}
                />
                <InfoInput
                    title="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={handlePasswordChange}
                    helperMsg={passwordHelperMsg}
                    helperStyle={passwordHelperStyle}
                />
                <PurpleLongBtn ButtonName="로그인" />
            </form>
            <NoStyleButton ButtonName="회원가입" onClick={() => nav('/join')} />
        </>
    )
}

export default Login;
