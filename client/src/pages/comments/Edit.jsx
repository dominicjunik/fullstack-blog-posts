import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// `/comments/${post._id}/${comment._id}`
function EditComment() {
    let [comment, setComment ] = useState({})
    const { postId, commentId } = useParams()

    const textRef = useRef()
    let navigate = useNavigate()

    async function getComment() {
        try {
            const response = await axios.get(`/api/comments/${postId}/${commentId}`)
            console.log(response.data)
            setComment(response.data)
            
        } catch(err) {
            console.log(err.message) 
            alert('didnt get data: error 400')
            navigate(-1)           
        }
    }
    
    
    async function handleUpdate(e) {
        e.preventDefault()
        try {
            const newComment = {
                text: textRef.current.value
            }
            await axios.put(`/api/comments/${postId}/${commentId}`, newComment)
            navigate(`/posts/${postId}`)
        } catch(err) {
            console.log(err.message)
           
        }

    }

    useEffect(() => {
        getComment()
    }, [])

    if (!comment.text) {
        return <div>Loading...</div>
    }

    return ( 
        <>
            <h1>Edit Comment</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleUpdate}>

                    <label htmlFor="clr">Body:</label><br />
                    <textarea name="text" id="clr" cols="30" rows="10" defaultValue={comment.text} ref={textRef}/><br /><br />

                    <button>Submit</button>
                </form>

                <button onClick={() => navigate(`/posts/${postId}`)}>Back</button>
            </div>
        </>
    );
}

export default EditComment;