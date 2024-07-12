import "../style/pages/UpdateProfile.css";
import Header from "../components/Header";
import InfoInput from "../components/InfoInput";
import Modal from "../components/Modal";
import { PurpleLongBtn, NoStyleButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_USERS } from "../config";
import axios from "axios";
import useUser from "../hooks/useUser"; // 커스텀 훅 임포트

function UpdateProfile() {
    const [imageUrl, setImageUrl] = useState(null);
    const [isModalShow, setIsModalShow] = useState(false);
    const nav = useNavigate();

    const { user } = useUser(); // 커스텀 훅 사용
    const email = user?.email || "";
    const nickname = user?.nickname || "";
    const userImage = user?.imageUrl || "";

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenModal = () => {
        setIsModalShow(true);
    };

    const handleCloseModal = () => {
        setIsModalShow(false);
    };

    const handleUserDelete = async () => {
        try {
            const response = await axios.delete(API_USERS);
            if (response && response.data && response.data.success) {
                alert("회원탈퇴가 완료되었습니다.");
                nav("/"); // Navigate to home page
            } else {
                console.log("회원탈퇴 실패");
            }
        } catch (error) {
            console.log("회원탈퇴 중 응답 오류", error);
        }
    };

    return (
        <>
            <Header showBackButton={false} showCircleButton={true} />
            <form id="UpdateProfileForm" onSubmit={handleFormSubmit}>
                <div className="title">회원정보수정</div>
                <div className="InputBox">
                    <div className="InputBoxTitle">프로필 사진</div>
                    <div className="prf-img">
                        <input
                            className="image"
                            id="fileUpload"
                            type="file"
                            accept=".jpg,.png"
                            name="userPicture"
                            onChange={handleImageChange}
                        />
                        <label
                            id="fileUpload-label"
                            htmlFor="fileUpload"
                            className={imageUrl ? 'has-image' : ''}
                            style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
                        ></label>
                    </div>
                </div>
                <div className="email-section">
                    <div className="email-title">이메일</div>
                    <div className="email-content">{email}</div>
                </div>
                <InfoInput title="닉네임" type="text" placeholder={nickname} />
                <PurpleLongBtn ButtonName="수정하기" />
            </form>
            <NoStyleButton ButtonName="회원탈퇴" onClick={handleOpenModal} />
            {isModalShow && (
                <Modal
                    modalTitle="회원탈퇴 하시겠습니까?"
                    modalContent="작성된 게시글과 댓글은 삭제됩니다."
                    onConfirm={handleUserDelete}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

export default UpdateProfile;
