import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CommentContext } from "./CommentProvider";

export const CommentForm = () => {

    const { createComment } = useContext(CommentContext)

    const [comments, setComments] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const { postId } = useParams()
	const history = useHistory();

    const handleControlledInputChange = (event) => {
      const newComment = { ...comments }
      newComment[event.target.name] = event.target.value
      setComments(newComment)
    }

    useEffect(() => {
      if (isLoading === false) {
        return
      }
      else {
        handleSaveComments()
      }
  }, [isLoading])


    const checkForm = () => {
      if (
        comments.content === undefined 
      ){return false}
      else {return true}
    }

// TODO change this to fit comment object
    const handleSaveComments = () => {
        const userId = localStorage.getItem("rare_user_id")
        if (checkForm() === true) {
            createComment({
            post_id: parseInt(postId),
            author_id: parseInt(userId),
            content: comments.content,
            comment_date: new Date().toLocaleDateString()
        })
        .then(() => history.push(`/posts/${postId}`))
        }  
        else {
          window.alert('Please fill in all form fields before submitting your comment.')
          setIsLoading(false)
        }
      }


    return (
    <>
        <h1>New Comment</h1>

            <form className="flex comments">
        
                <fieldset>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input value={comments.content} type="content" id="content" name="content" onChange={handleControlledInputChange}/>
                </div>
                </fieldset>

                <button 
                disabled={isLoading}
                onClick={event => {
                    setIsLoading(true)
                    event.preventDefault()
                }}>Send</button>
            </form>
    </>
    )
}