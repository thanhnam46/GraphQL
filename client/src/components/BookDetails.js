import React from 'react';
import { getBookQuery } from '../queries/queries';
import { useQuery } from '@apollo/client';

export default function BookDetails(props) {
    const { loading, data } = useQuery(getBookQuery, { variables: { id: props.bookId } });
    if (data) {
        return (
            <div id="book-details">
                <p>{`Name: ${data.book.name}`}</p>
                <p>{`Genre: ${data.book.genre}`}</p>
                <p>{`Author: ${data.book.author.name}`}</p>
                <ul>
                    {data.book.author.books.map((book) => {
                        return <li key={book.id}>{book.name}</li>;
                    })}
                </ul>
            </div>
        );
    } else {
        return <div id="book-details">No book selected</div>;
    }
}
