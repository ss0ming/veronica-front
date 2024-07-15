import { useEffect, useState } from "react"
import Header from "../components/Header"
import InfoInput from "../components/InfoInput"
import PostForm from "../components/PostForm"
import { useNavigate, useParams } from "react-router-dom"
import { validateTitleAndContent } from "../util/validator"
import { API_POST } from "../config"
import axios from "axios"

function NewPost() {
    const nav = useNavigate()
    const { postId } = useParams()
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null
    })
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const url = API_POST.replace(':postId', postId)
                const response = await axios.get(url)
                setFormData({
                    title: response.data.title,
                    content: response.data.content,
                    image: response.data.image
                })
            }
            catch (error){
                console.error("게시글 로드 중 에러 발생", error)
            }
        }
        fetchPost()
    }, [postId])

    const handleFormChange = (e) => {
        const { name, value, files } = e.target
        let newFormData = { ...formData }
        
        if (files) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData({
                    ...newFormData,
                    [name]: reader.result
                })
            }
            reader.readAsDataURL(files[0])
        } else {
            newFormData[name] = value
            setFormData(newFormData)

            const validation = validateTitleAndContent(newFormData.title, newFormData.content)
            setIsFormValid(validation.isValid)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const { title, content, image } = formData

        const validation = validateTitleAndContent(title, content)
        setIsFormValid(validation.isValid)

        if (validation.isValid) {
            try {
                const url = API_POST.replace(':postId', postId)
                const postPayload = { title, content, image }
                const token = localStorage.getItem('accessToken')

                await axios.put(url, postPayload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                alert("게시글이 수정되었습니다.")
                nav("/posts")
            } catch (error) {
                console.error("폼 제출 중 에러 발생", error)
            }
        }
    }

    return (
        <>
            <Header showBackButton={true} showCircleButton={true} nav={nav} />
            <PostForm
                FormTitle="게시글 수정"
                onSubmit={handleFormSubmit}
                onChange={handleFormChange}
                formData={formData}
            />            
        </>
    )
}

export default NewPost