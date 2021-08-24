import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const PostContext = createContext();
const api = "https://rare-serverer.herokuapp.com"

// This component establishes what data can be used.
export const PostProvider = (props) => {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState({});

	const getPostsByUserId = () => {
		return (
			fetch(`${api}/posts/myposts`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}
		)).then((res) => res.json())
		.then(setPosts)
	};

	const getPosts = () => {
		return (
			fetch(`${api}/posts`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setPosts)
	};

	const deletePost = (postId) => {
		return fetch(`${api}/posts/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		});
	};
  
	const createPost = (postObject) => {
		return fetch(`${api}/posts`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postObject)
		}).then(getPosts);
	};

	const getPostsDetails = (postId) => {
		return (
			fetch(`${api}/posts/${postId}`,
			{
				headers: {
					"Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}		
		)).then((res) => res.json())
		.then(setPost)
	};

	const getPost = (postId) => {
		return (
			fetch(`${api}/posts/${postId}`,
			{
				headers: {
					"Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}		
		)).then((res) => res.json())
	};

	const updatePost = (update_post) => {
		return fetch(`${api}/posts/${update_post.id}`, {
			method: "PUT",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(update_post),
		}).then(getPosts);
	};

	const managePostApproval = (post) => {
		return fetch(`${api}/posts/${post.id}/approve`, {
			method: "PUT",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(post),
		})
	};

	return (
		<PostContext.Provider
			value={{
				posts,
				setPosts,
				post,
				setPost,
				getPostsByUserId,
				getPostsDetails,
				getPosts,
				deletePost,
				createPost,
				updatePost,
				managePostApproval,
				getPost
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};
