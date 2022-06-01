// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// libraries
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

// appolo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1> GraphQL Tutorial</h1>
                <BookList />
                <AddBook />
            </div>
        </ApolloProvider>
    );
}

export default App;
