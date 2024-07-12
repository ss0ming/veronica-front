import "../style/pages/Login.css"
import Header from "../components/Header"
import InfoInput from "../components/InfoInput"
import { PurpleLongBtn } from "../components/Button"
import useValidation from "../hooks/useValidation"
import { validatePassword, validateConfirmPassword } from "../util/validator"
import { API_PASSWORD } from "../config"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function UpdatePassword() {
    const nav = useNavigate()
    const {
        value: password,
        helperMsg: passwordHelperMsg,
        helperStyle: passwordHelperStyle,
        isValid: isPasswordValid,
        handleChange: handlePasswordChange
    } = useValidation("", validatePassword);

    const {
        value: confirmPassword,
        helperMsg: confirmPasswordHelperMsg,
        helperStyle: confirmPasswordHelperStyle,
        isValid: isConfirmPasswordValid,
        handleChange: handleConfirmPasswordChange
    } = useValidation("", value => validateConfirmPassword(password, value));

    const handleFormSubmit = async(e) => {
        e.preventDefault()

        if (isPasswordValid && isConfirmPasswordValid) {
            try {
                const response = await axios.patch(API_PASSWORD, {
                    password: password
                });

                if (response.data.success) {
                    console.log('비밀번호 변경 성공')
                    alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
                    nav('/')
                } else {
                    console.log('비밀번호 변경 실패')
                }
            } catch (error) {
                console.log('비밀번호 변경 중 오류 발생', error)
            }
        } else {
            console.log('유효하지 않은 입력값이 있습니다.')
        }
    }

    return (
        <>
            <Header showBackButton={false} showCircleButton={true} />
            <form id="UpdatePasswordForm" onSubmit={handleFormSubmit}>
                <div className="title">비밀번호 수정</div>
                <InfoInput
                    title="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={handlePasswordChange}
                    helperMsg={passwordHelperMsg}
                    helperStyle={passwordHelperStyle}
                />
                <InfoInput
                    title="비밀번호 확인"
                    type="password"
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    helperMsg={confirmPasswordHelperMsg}
                    helperStyle={confirmPasswordHelperStyle}
                />
                <PurpleLongBtn ButtonName="수정하기" />
            </form >
        </>
    )
}

export default UpdatePassword