import "../style/pages/DetailPost.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Modal from "../components/Modal.jsx";
import { PostUpdateDeleteBtn, PurpleShortBtn } from "../components/Button.jsx";
import CommentList from "../components/CommentList.jsx";
import { API_POST, API_COMMENT, API_COMMENTS } from "../config.js";
import axiosInstance from "../api/axios.js";
import { formatDate } from "../util/format-date.js";
import useUser from "../hooks/useUser.jsx";

function DetailPost() {
    const [isModalShow, setIsModalShow] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState(null);
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [isEditing, setIsEditing] = useState(false); // 댓글 수정 상태를 관리
    const { user } = useUser();
    const nav = useNavigate();
    const { postId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const url = API_POST.replace(":postId", postId);
                const response = await axiosInstance.get(url);

                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    const mappedData = {
                        postId: data.articleId,
                        title: data.title,
                        content: data.content,
                        postImage: data.image,
                        likes: data.likes,
                        views: data.viewCount,
                        createdAt: data.createdAt,
                        userId: data.email,
                        nickname: data.nickname,
                        userImage: data.profileImage,
                    };

                    setPost(mappedData);
                } else {
                    console.error("게시물을 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error("게시물을 불러오는데 오류가 발생했습니다. : ", error);
            }
        };
        fetchPost();
    }, [postId]);

    const handleOpenModal = (itemId, itemType) => {
        setSelectedItemId(itemId);
        setSelectedItemType(itemType);
        setIsModalShow(true);
    };

    const handleCloseModal = () => {
        setIsModalShow(false);
        setSelectedItemId(null);
        setSelectedItemType(null);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (selectedItemType === "post") {
                await axiosInstance.delete(API_POST.replace(":postId", selectedItemId), { headers });
                alert("게시글이 삭제되었습니다.");
                nav("/posts");
            } else if (selectedItemType === "comment") {
                const commentUrl = API_COMMENT.replace(":postId", post?.postId).replace(":commentId", selectedItemId);
                await axiosInstance.delete(commentUrl, { headers });
                alert("댓글이 삭제되었습니다.");
                window.location.reload();
            }
            handleCloseModal();
        } catch (error) {
            console.error(`${selectedItemType} 삭제 중 오류가 발생했습니다 :`, error);
            alert(`${selectedItemType} 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`);
            handleCloseModal();
        }
    };

    const handleAddComment = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            const commentData = {
                content: comment,
            };

            const url = API_COMMENTS.replace(":postId", post?.postId);
            await axiosInstance.post(url, commentData, { headers });
            alert("댓글이 등록되었습니다.");
            setComment("");
            window.location.reload();
        } catch (error) {
            console.error("댓글 등록 중 오류가 발생했습니다:", error);
            alert("댓글 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    const handleEditComment = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const commentData = {
                content: comment,
            };

            const commentUrl = API_COMMENT.replace(":postId", post?.postId).replace(":commentId", selectedItemId);
            await axiosInstance.put(commentUrl, commentData, { headers });
            alert("댓글이 수정되었습니다.");
            setComment("");
            setIsEditing(false);
            setSelectedItemId(null);
            window.location.reload();
        } catch (error) {
            console.error("댓글 수정 중 오류가 발생했습니다:", error);
            alert("댓글 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    const handleEditButtonClick = (commentId, commentContent) => {
        setComment(commentContent);
        setIsEditing(true);
        setSelectedItemId(commentId);
    };

    const userImageUrl = post?.userImage ? `data:image/png;base64,${post.userImage}` : null;
    const postImageUrl = post?.postImage ? `data:image/png;base64,${post.postImage}` : null;

    return (
        <>
            <Header showBackButton={true} showCircleButton={true} nav={nav} />
            <div className="DetailPost">
                <div className="post-title">{post?.title}</div>
                <div className="info-section">
                    <div className="user-img">
                        <img src={userImageUrl} alt="user" />
                    </div>
                    <div className="user-nickname">{post?.nickname}</div>
                    <div className="create-date">{post?.createdAt ? formatDate(post.createdAt) : ""}</div>
                    <div style={{ marginLeft: "auto" }}>
                        {user?.email === post?.userId && (
                            <PostUpdateDeleteBtn onClick={() => handleOpenModal(post?.postId, "post")} />
                        )}
                        {isModalShow && selectedItemType === "post" && (
                            <Modal
                                modalTitle="게시글을 삭제하시겠습니까?"
                                modalContent="삭제한 내용은 복구할 수 없습니다."
                                onClose={handleCloseModal}
                                onConfirm={handleDelete}
                            />
                        )}
                    </div>
                </div>
                <hr style={{ border: "0.5px solid rgb(0,0,0,0.16)", width: "100%" }} />
                <div className="post-img">{postImageUrl && <img src={postImageUrl} alt="post" />}</div>
                <div className="post-content">{post?.content}</div>
                <div className="view-like-section">
                    <div className="view">
                        {post?.views}
                        <br />
                        조회수
                    </div>
                    <div className="like">
                        {post?.likes}
                        <br />
                        좋아요
                    </div>
                </div>
                <hr style={{ border: "0.5px solid rgb(0,0,0,0.16)", width: "100%" }} />
                <div className="comment-section">
                    <textarea
                        className="comment"
                        placeholder="댓글을 남겨주세요"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="comment-button">
                        <PurpleShortBtn
                            ButtonName={isEditing ? "댓글 수정" : "댓글 등록"}
                            onClick={isEditing ? handleEditComment : handleAddComment}
                        />
                    </div>
                </div>
                {post && <CommentList postId={post?.postId} onOpenModal={handleOpenModal} onEditComment={handleEditButtonClick} />}
                {isModalShow && selectedItemType === "comment" && (
                    <Modal
                        modalTitle="댓글을 삭제하시겠습니까?"
                        modalContent="삭제한 내용은 복구할 수 없습니다."
                        onClose={handleCloseModal}
                        onConfirm={handleDelete}
                    />
                )}
            </div>
        </>
    );
}

export default DetailPost;
