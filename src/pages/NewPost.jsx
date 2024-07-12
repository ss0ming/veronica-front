import Header from "../components/Header"
import PostForm from "../components/PostForm"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { validateTitleAndContent } from "../util/validator"
import { API_POSTS } from "../config"

function NewPost() {
    const nav = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null
    })
    const [helperText, setHelperText] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        let newFormData = { ...formData }
        
        if (files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    [name]: reader.result
                });
            };
            reader.readAsDataURL(files[0]);
        } else {
            newFormData[name] = value
            setFormData(newFormData)

            const validation = validateTitleAndContent(newFormData.title, newFormData.content)
            setHelperText(validation.message)
            setIsFormValid(validation.isValid)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const { title, content, image } = formData;

        if (isFormValid) {
            try {
                const token = localStorage.getItem("accessToken")
                const postPayload = {
                    title,
                    content,
                    image
                };

                await axios.post(API_POSTS, postPayload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert("게시글이 등록되었습니다.")
                nav("/posts");
            } catch (error) {
                console.error("폼 제출 중 에러 발생", error);
            }
        } else {
            setHelperText("* 제목과 내용을 확인해주세요.")
        }
    }

    return (
        <>
            <Header showBackButton={true} showCircleButton={true} nav={nav} />
            <PostForm 
                FormTitle="게시글 작성" 
                onSubmit={handleFormSubmit} 
                onChange={handleFormChange}
                formData={formData}
                helperText={helperText}
            />            
        </>
    )
}

export default NewPost
