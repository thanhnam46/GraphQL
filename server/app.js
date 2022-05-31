const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    'mongodb+srv://test123:test123@cluster0.55zj6.mongodb.net/?retryWrites=true&w=majority',
);
mongoose.connection.once('open',()=>{
    console.log('Connected to mongo cloud db!')
})

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});
