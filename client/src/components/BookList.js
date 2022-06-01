import React from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

export default function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>`Error: ${error}`</p>;

    return (
        <div>
            <ul id="book-list">
                {data.books.map((book) => {
                    return <li key={book.id}>{book.name}</li>;
                })}
            </ul>
        </div>
    );
}
