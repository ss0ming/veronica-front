import "../style/components/CommentList.css";
import { CommentUpdateDeleteBtn } from "../components/Button.jsx";
import { formatDate } from "../util/format-date.js";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios.js";
import { API_COMMENTS } from "../config.js";
import useUser from "../hooks/useUser.jsx";

function CommentList({ postId, onOpenModal, onEditComment }) {
    const [comments, setComments] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const url = API_COMMENTS.replace(":postId", postId);
                const response = await axiosInstance.get(url);

                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);

                    const mappedComments = data.map((comment) => ({
                        commentId: comment.commentId,
                        email: comment.email,
                        userImage: comment.userImage,
                        nickname: comment.nickname,
                        createdAt: comment.createdAt,
                        comment: comment.content,
                    }));
                    setComments(mappedComments);
                } else {
                    console.error("댓글을 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error("댓글을 불러오는데 오류가 발생했습니다.", error);
            }
        };

        fetchComments();
    }, [postId]);

    return (
        <div className="CommentList">
            {comments.map((comment) => (
                <div key={comment.commentId} className="comment-wrapper">
                    <div className="comment-box">
                        <div className="comment-info">
                            <img src={comment.userImage} alt="User" />
                            <div className="comment-user-nickname">{comment.nickname}</div>
                            <div className="comment-date">{formatDate(comment.createdAt)}</div>
                        </div>
                        <div className="comment-content">
                            <div className="comment-text">{comment.comment}</div>
                        </div>
                    </div>
                    {user?.email === comment.email && (
                        <div className="button-box">
                            <CommentUpdateDeleteBtn
                                onClick={() => onOpenModal(comment.commentId, "comment")}
                                onEditClick={() => onEditComment(comment.commentId, comment.comment)}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CommentList;
