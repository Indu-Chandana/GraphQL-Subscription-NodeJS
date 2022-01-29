import { gql, useSubscription } from "@apollo/client";

const MESSAGES_SUBSCRIPTION = gql`
    subscription Subscription {
      roomCreated {
        name
        topic
        id
      }
    }
`

function Room() {

    const { data, loading } = useSubscription(
        MESSAGES_SUBSCRIPTION,
        {
            onSubscriptionData: (data) => {
                console.log("MESSAGE RECEIVED", data);
            }
        }
    )

    return "This is the Room component";
}

export default Room;