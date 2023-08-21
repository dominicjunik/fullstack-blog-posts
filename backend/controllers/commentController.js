const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')

module.exports.create = async (req, res) => {
    // create a comment by updating the comments property in post
    try {
        // create a document in our comments collection
        const comment = await Comments.create(req.body)
        // find the post
        await Posts.findByIdAndUpdate(req.params.postId, {
            // push the new comment document's id
            $push: {
                comments: comment._id
            }
        })
        res.json(comment)
    } catch(err) {
        console.log(err)
        res.json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    // delete a comment by updating the comments property in post
    try {
        // first use the comment id to delete the comment from the comments collection
        await Comments.findByIdAndDelete(req.params.commentId)
        // then use the post id to find the post
        await Posts.findByIdAndUpdate(req.params.postId, {
            // pull/remeove the reference id of the comment we deleted
            $pull: {
                comments: req.params.commentId
            }
        })
        res.json({ message: "successfully deleted" })
    } catch(err) {
        console.log(err.message)
        res.json({ error: err.message })
    }
}

module.exports.index = async (req, res) => {
    // target the comments property 
    try {
        const post = await Posts.findById(req.params.postId).populate('comments')
        res.json(post.comments)
    }  catch(err) {
        console.log(err.message)
        res.json({ error: err.message })
    }
}

module.exports.show = async (req, res) => {
    // find the post and filter it's comments property array
    try {
        const comment = await Comments.findById(req.params.commentId)
        res.json(comment)
    } catch(err) {
        console.log(err.message)
        res.json({ error: err.message })
    }
}

module.exports.update = async (req, res) => {
    // update a comment by updating an item in the comments property in post
    try {
        const updatedPost = await Comments.findByIdAndUpdate(req.params.commentId, req.body, {new: true})
        res.json(updatedPost)
    } catch(err) {
        console.log(err.message)
        res.json({ error: err.message })
    }
}