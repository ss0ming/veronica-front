import "../style/components/CommentList.css";
import { CommentUpdateDeleteBtn } from "../components/Button.jsx";
import { formatDate } from "../util/format-date.js";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios.js";
import { API_COMMENTS } from "../config.js";

function CommentList({ postId, onOpenModal }) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        axiosInstance.get(API_COMMENTS.replace(':/postId', postId))
            .then(response => setComments(response.data))
            .catch(error => console.log('댓글을 불러오는데 오류가 발생했습니다.',error))
    }, [postId])

    return (
        <div className="CommentList">
            {postComments.map(comment => (
                <div key={comment.commentId} className="comment-wrapper">
                    <div className="comment-box">
                        <div className="comment-info">
                            <img src={comment.userImage}/>
                            <div className="comment-user-nickname">{comment.nickname}</div>
                            <div className="comment-date">{formatDate(comment.created_at)}</div>
                        </div>
                        <div className="comment-content">
                            <div className="comment-text">{comment.comment}</div>
                        </div>
                    </div>
                    <div className="button-box">
                        <CommentUpdateDeleteBtn onClick={() => onOpenModal(comment.commentId, 'comment')}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentList;