import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from 'axios'

function Index() {

    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    async function getPosts() {
        const response = await axios.get('/api/posts')
        console.log(response.data)
        setPosts(response.data)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
            <>
                <h1>Index View</h1>
                <div id="posts">

                        {posts.map((post, index) => 
                            <div className="a-post" key={index}>
                                <a href={`/posts/${post._id}`}>{post.subject}</a>
                            </div>
                        )}
            
             
                    <button onClick={() => navigate('/posts/new')}>NEW POST</button>
               
                </div>
            </>
    )
}

export default Index