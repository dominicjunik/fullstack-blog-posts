import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

function Show() {

    const [post, setPost] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

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
                                    <form action={`/comments/${post._id}/${comment._id}?_method=DELETE`} method="POST"><input type="submit" value="X"/></form>
                                    <a href={`/comments/${post._id}/${comment._id}`}>+</a>
                                </div>
                            )}</p>
                            <br/><br/>
                        </>
                        : ''
                    }
                    <details>
                        <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                        <form action={`/comments/${post._id}`} method="POST">
                            <textarea name="text" id="lc" cols="1" rows="1" />
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