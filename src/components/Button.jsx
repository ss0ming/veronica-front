import { useNavigate, useParams } from "react-router-dom"
import "../style/components/Button.css"

export const PurpleLongBtn = ({ButtonName}) => {
    return (
        <button className="PurpleLongBtn">{ButtonName}</button>
    )

}
export const PurpleShortBtn = ({ButtonName, onClick}) => {
    return (
        <div className="PurpleShortBtnBox">
            <button className="PurpleShortBtn" onClick={onClick}>{ButtonName}</button>
        </div>

    )

}
export const PostUpdateDeleteBtn = ({ onClick }) => {
    const nav = useNavigate()
    const {postId} = useParams()
    return (
        <div className="UpdateDeleteBtn-box">
            <button className="UpdateBtn" id="post-update-button" onClick={() => nav(`/posts/${postId}/update`)}>수정</button>
            <button className="DeleteBtn" id="post-delete-button" onClick={onClick}>삭제</button>
        </div>
    )

}

export const CommentUpdateDeleteBtn = ({ onClick }) => {
    const nav = useNavigate()
    const {id} = useParams()
    return (
        <div className="UpdateDeleteBtn-box">
            <button className="UpdateBtn" id="post-update-button">수정</button>
            <button className="DeleteBtn" id="post-delete-button" onClick={onClick}>삭제</button>
        </div>
    )

}

export const NoStyleButton = ({ButtonName, onClick}) => {
    return (
        <button className="NoStyleButton" onClick={onClick}>{ButtonName}</button>
    )

}