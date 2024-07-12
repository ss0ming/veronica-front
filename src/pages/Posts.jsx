import "../style/pages/Posts.css"
import Header from "../components/Header"
import PostList from "../components/PostList"
import { useEffect, useState } from "react"
import { API_POSTS } from "../config"
import axiosInstance from "../api/axios"

function Posts() {
    const [data, setData] = useState([])

    useEffect(() => {
        axiosInstance.get(API_POSTS)
            .then(response => {
                const mappedData = response.data.map(post => ({
                    postId: post.articleId,
                    userId: post.email,
                    nickname: post.nickname,
                    userImage: post.profileImage,
                    title: post.title, 
                    content: post.content,
                    postImage: post.image,
                    created_at: post.createdAt,
                    view: post.viewCount,
                    like: post.likes,
                    comment_count: post.commentCount
                }));
                setData(mappedData);
            })
            .catch(error => console.error('게시물을 불러오는데 오류가 발생했습니다. : ', error))
    }, [])

    return (
        <>
            <Header showBackButton={false} showCircleButton={true} />
            <div className="wrapper">
                <div className="intro">안녕하세요,<br /> 아무 말 대잔치 <strong>게시판</strong>입니다.</div>
                <PostList data={data} />
            </div>
            
        </>
    )
}

export default Posts