const { gql } = require('apollo-server');

module.exports = gql`
    type Room {
        id: ID
        topic: String
        name: String
        lang: String
        capacity: String
        creator: String
        createdAt: String
        conversation: [message]
        roomUser: [roomUser]
    }

    type message {
        user: String,
        text: String
    }

    type roomUser {
        name: String,  
        img: String
    }

    input RoomInput {
        topic: String
        name: String
        lang: String
        capacity: String
        creator: String
        createdAt: String
        conversation: String
        roomUser: String
    }

    type Query {
        hello: String
    }

    type Mutation {
        createPost(room: RoomInput): Room
    }

    type Subscription {
        roomCreated: Room
    }
`