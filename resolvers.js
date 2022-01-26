const Room = require('./models/room.js');
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
    Query: {
        hello: () => {
            return "Hello World"
        },
    },

    Mutation: {
        createPost: async(parent, args, context, info) => {
            const { topic, name, lang, capacity, creator, createdAt, conversation, roomUser,} = args.room;

            const room = new Room({ topic, name, lang, capacity, creator, createdAt, conversation, roomUser, })

            await room.save();

            // subscribers.forEach(fn => fn())

            pubsub.publish('ROOM_CREATED', {
                roomCreated: room
            })

            return room;
        },
    },

    Subscription: {
        roomCreated: {
            subscribe: () => pubsub.asyncIterator('ROOM_CREATED')
        }
    }
}