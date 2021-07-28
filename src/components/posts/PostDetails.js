import React, { useContext, useEffect, useState} from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory, useParams } from "react-router-dom"

export const PostDetails = () => {
    const {post, getPostsDetails} = useContext(PostContext)
    const {postId} = useParams()

    useEffect(() => {
        getPostsDetails(postId)
    }, [])

    return (
        <div>
            <h1>Post Details</h1>     
                <>
                <div>{post.title}</div>
                <div>{post.publication_date}</div>
                <img src={post.image_url}></img>
                <div>{post.content}</div>
                <div>Category: {post.category?.label}</div>
                <div>Author: {post.user?.first_name} {post.user?.last_name}</div>
                </>
        </div>
    )
}



