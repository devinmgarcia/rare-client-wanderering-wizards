import React, { useState, createContext } from "react"

export const AuthorContext = createContext();
const api = "https://rare-serverer.herokuapp.com"

export const AuthorProvider = (props) => {
	const [authors, setAuthors] = useState([]);
	const [author, setAuthor] = useState({});

  const getAuthors = () => {
		return fetch(`${api}/authors`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		})
			.then((response) => response.json())
			.then(setAuthors);
	};

	const getAuthorDetails = (authorId) => {
		return (
			fetch(`${api}/authors/${authorId}`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}		
		)).then((res) => res.json())
		.then(setAuthor)
	};

  const getAuthorById = () => {
		return (
			fetch(`${api}/authors/getAuthor`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}
		)).then((res) => res.json())
    .then(setAuthor)
	};


  return (
		<AuthorContext.Provider
			value={{authors, getAuthors, author, getAuthorDetails, getAuthorById
			}}
		>
			{props.children}
		</AuthorContext.Provider>
	);
};
