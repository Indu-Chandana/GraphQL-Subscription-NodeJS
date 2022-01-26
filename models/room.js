const mongoose = require('mongoose');

// const PostSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//     },
// });

// const Post = mongoose.model('post', PostSchema)
// module.exports = Post;

const roomSchema = mongoose.Schema({
    topic: String,
    name: String,
    lang: String,
    capacity: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    // msg: {
    //     type: [String],
    //     default: [],
    // },
    conversation: [
        {
            user: String, 
            text: String
        }
    ],
    roomUser: [
        {
            name: String, 
            img: String
        }
    ]
});

const Post = mongoose.model('Room', roomSchema);

// export default Room;
module.exports = Post;