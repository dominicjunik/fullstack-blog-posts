import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

function Show() {

    const [post, setPost] = useState({})
    

    const { id } = useParams()
    const navigate = useNavigate()
    const textRef = useRef()
    const details = useRef()

    async function getPost() {
        try {
            const response = await axios.get(`/api/posts/${id}`)
            console.log(response.data)
            setPost(response.data)
        } catch(err) {
            console.log(err.message)
        }
    }

    async function handleDeletePost() {
        await axios.delete(`/api/posts/${id}`)
        navigate('/posts')
    }

    async function handleDeleteComment(commentId) {
        
        const deleted = await axios.delete(`/api/comments/${id}/${commentId}`)
        console.log(deleted)
        setPost(deleted.data)
    }

    async function handleCreateComment(e) {
        e.preventDefault()
        const comment = {
            text: textRef.current.value
        }
        const created = await axios.post(`/api/comments/${id}`, comment)
        setPost(created.data)
        textRef.current.value = ''
        // useRef allows for DOM manipulations
        details.current.removeAttribute('open')
    }

    useEffect(() => {
        getPost()
    }, [])



    if (!post.subject) {
        return <div>Loading...</div>
    }

    return (
            <>
                <div className="a-post">
                    <h2>{post.subject}</h2>
                    <h5 style={{ opacity: '.3'}}>Posted by {post.user} on {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}</h5>
                    <p className='p-body'>{post.body}</p><br /><br />

                    {
                        post?.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <p>{post.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.text}</div>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        handleDeleteComment(comment._id)
                        
                                    
                                    }}><input type="submit" value="X"/></form>
                                    <a href={`/comments/${post._id}/${comment._id}`}>+</a>
                                </div>
                            )}</p>
                            <br/><br/>
                        </>
                        : ''
                    }
                    <details ref={details}>
                        <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                        <form onSubmit={handleCreateComment}>
                            <textarea name="text" id="lc" cols="1" rows="1" ref={textRef}/>
                            <button>Comment</button>
                        </form>
                    </details>
                    
                    <div className="buttons">

                        <button onClick={handleDeletePost}>Delete</button>
                       
                   
                        <button onClick={() => navigate(`/posts/${id}/edit`)}>Edit</button>
               
                        
                        <button onClick={() => navigate('/posts')}>Back</button>
                     
                    </div>
                </div>
            </>
    )
}

export default Show