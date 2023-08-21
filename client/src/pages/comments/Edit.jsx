import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout';

function Edit(props) {
    return ( 
        <DefaultLayout>
            <h1>Edit Comment</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form action={`/comments/${props.postId}/${props.comment._id}?_method=PUT`} method="POST">

                    <label htmlFor="clr">Body:</label><br />
                    <textarea name="text" id="clr" cols="30" rows="10" defaultValue={props.comment.text} /><br /><br />

                    <button>Submit</button>
                </form>
                <form action={`/posts/${props.postId}`}>
                    <button>Back</button>
                </form>
            </div>
        </DefaultLayout>
    );
}

export default Edit;