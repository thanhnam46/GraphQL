import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

export default function BookList() {
    const [selectedBookId, setSelectedBookId] = useState('');
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>`Error: ${error}`</p>;

    return (
        <div>
            <ul id="book-list">
                {data.books.map((book) => {
                    return (
                        <li
                            key={book.id}
                            onClick={(e) => {
                                setSelectedBookId(book.id);
                            }}
                        >
                            {book.name}
                        </li>
                    );
                })}
            </ul>
            <BookDetails bookId={selectedBookId} />
        </div>
    );
}
