import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, Link } from "react-router-dom";
import { CategoryContext } from "../category/CategoryProvider";
import { AuthorContext } from "../authors/AuthorProvider";



export const PostList = (props) => {
	const { posts, getPosts, managePostApproval } = useContext(PostContext);
	const {categories, getCategories} = useContext(CategoryContext)
	const {authors, getAuthors} = useContext(AuthorContext)
	const isAdmin = JSON.parse(localStorage.getItem("rare_admin"));

	// console.log(posts);

	const approvedPosts = posts.filter((post) => post.approved > 0);
	const sortedPosts = approvedPosts.sort(
		(post1, post2) =>
			Date.parse(post2.publication_date) - Date.parse(post1.publication_date)
	);
	const now = new Date();
	// const filteredPostsByDate = sortedPosts.filter(
	//   (post) => Date.parse(post.publication_date) <= now
	// );
	const history = useHistory();

	useEffect(() => {
		getPosts();
		getCategories()
		getAuthors()
	}, []);

	const manageApproval = (post) => {
		if (post.approved) {
			const updatedPost = {
				id: post.id,
				approved: 0,
			};
			managePostApproval(updatedPost);
		} else {
			const updatedPost = {
				id: post.id,
				approved: 1,
			};
			managePostApproval(updatedPost);
		}
	};

	const handleUpdatePost = (post_id) => {
		history.push(`/posts/edit/${post_id}`);
	};

	return (
		<>
			<div className="plContainer">
				<div className="plLeft">
					{posts.map((post) => {
						return (
							<>
								{isAdmin ? (
									<article className="flex">
										<div className="postLeft">
											<div className="postAuthorDiv">
												<img
													className="postPI"
													src={post.user.author?.profile_image_url}
												/>
												<strong>
													{post.user.first_name} {post.user.last_name}
												</strong>
												<p style={{ margin: "0 3px 0 3px" }}>in</p>
												<strong>{post.category.label}</strong>
											</div>
											<strong>
												<Link className="postTitle" to={`/posts/${post.id}`}>
													{post.title}
												</Link>
											</strong>
											<div>{post.content.slice(0, 50).trim()}...</div>
											<div className="postDateTag">
												<div className="postPubDate">
													{post.publication_date}
												</div>
												<span style={{ paddingRight: "8px" }}>•</span>
												{post.tags?.slice(0, 2).map((tag) => {
													return (
														<>
															<div className="postTag">{tag.label}</div>
														</>
													);
												})}
												<label style={{marginLeft: "auto"}} for="approval">Approved </label>
												<input
													type="checkbox"
													id={`approval-${post.id}`}
													name="approval"
													defaultChecked={post.approved ? "true" : ""}
													onChange={() => {
														manageApproval(post);
													}}
												/>
											</div>
										</div>
										<div className="postRight">
											<img className="postImage" src={post.image_url} />
										</div>
									</article>
								) : post.approved ? (
									<article className="flex">
										<div className="postLeft">
											<div className="postAuthorDiv">
												<img
													className="postPI"
													src={post.user.author?.profile_image_url}
												/>
												<strong>
													{post.user.first_name} {post.user.last_name}
												</strong>
												<p style={{ margin: "0 3px 0 3px" }}>in</p>
												<strong>{post.category.label}</strong>
											</div>
											<strong>
												<Link className="postTitle" to={`/posts/${post.id}`}>
													{post.title}
												</Link>
											</strong>
											<div className="postContent">{post.content.slice(0, 50).trim()}...</div>
											<div className="postDateTag">
												<div className="postPubDate">
													{post.publication_date}
												</div>
												<span style={{ paddingRight: "8px" }}>•</span>
												{post.tags?.slice(0, 2).map((tag) => {
													return (
														<>
															<div className="postTag">{tag.label}</div>
														</>
													);
												})}
											</div>
										</div>
										<div className="postRight">
											<img className="postImage" src={post.image_url} />
										</div>
									</article>
								) : (
									""
								)}
							</>
						);
					})}
				</div>
				<div className="plMiddle"></div>
				<div className="plRight">
					<article className="categorySection">
					<div style={{marginBottom: "1.5rem", fontSize: ".8rem", fontWeight: "bolder"}}>RECOMMENDED TOPICS</div>
					<div className="recCats">
						{categories?.slice(0, 12).map((category) => {
							return (
								<div className="category">{category.label}</div>
							)
						})}
					</div>
					</article>
					<article className="followSection">
					<div style={{marginBottom: "1.5rem", fontSize: ".8rem", fontWeight: "bolder"}}>WHO TO FOLLOW</div>
					<div className="recCats">
						{authors?.slice(2,).sort(()=> Math.random()-0.5).slice(0, 4).map((author) => {
							return (
								<div className="author">
									<div>
									<img className="postPI" style={{height: "3rem", width: "3rem"}} src={author.profile_image_url}></img>
									</div>
									<div className="authorDetails">
									<strong>{author.user.first_name} {author.user.last_name}</strong>
									<div className="authorBio">{author.bio.slice(0, 40).trim()}...</div>
									</div>
									<div className="followButton">
										<div className="follow">
										<Link className="followButtonLink" to={`/authors/${author.id}`}>Follow</Link>
										</div>
									</div>
								</div>
							)
						})}
					</div>
					</article>
				</div>
			</div>
		</>
	);
};
