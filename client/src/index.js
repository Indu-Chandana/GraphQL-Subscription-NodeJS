import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from '@apollo/react-hooks';

// Create httpLink
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// Create a websockets link
const WsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

// Create a split Link
// If you are trying to subscribe, use the websockets one
// if you are trying to do anything else, use the httpLink
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
    },
    WsLink,
    httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
