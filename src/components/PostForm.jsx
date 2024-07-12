import "../style/components/PostForm.css"
import { PurpleLongBtn } from "./Button"

function PostForm({ FormTitle, onSubmit, onChange, formData, helperText }) {
    return (
        <form className="PostForm" onSubmit={onSubmit}>
            <div className="Form-title">{FormTitle}</div>
            <div className="title-section">
                <h4>제목</h4>
                <input
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    placeholder="제목을 입력해주세요. (최대 26글자)"
                    maxLength="26"
                />
            </div>
            <div className="content-section">
                <h4>내용</h4>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={onChange}
                    placeholder="내용을 입력해주세요."
                />
            </div>
            <div className="helper-text">{helperText}</div>
            <div className="image-section">
                <h4>이미지</h4>
                <input
                    name="image"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={onChange}
                />
            </div>
            <div className="button-section">
                <PurpleLongBtn ButtonName="완료" type="submit" />
            </div>
        </form>
    )
}

export default PostForm
