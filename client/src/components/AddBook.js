import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

export default function AddBook() {
    // Get form's data
    const [bookName, setBookName] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');

    // Declare useMutation hook
    const [addBook, { dataAddBook, loadingAddBook, errorAddBook }] = useMutation(addBookMutation);

    // Declare useQuery hook
    const { loading, error, data } = useQuery(getAuthorsQuery);

    // Handle getAuthorsQuery
    if (loading) return <p>Loading...</p>;
    if (error) console.log(`getAuthorsQuery error: ${error}`);

    // Handle addBook mutation
    if (loadingAddBook) return <p>Loading...</p>;
    if (errorAddBook) console.log(`addBook mutation error: ${errorAddBook}`);
    if (dataAddBook) console.log(dataAddBook);

    function addBookForm(e) {
        e.preventDefault();
        addBook({
            variables: {
                name: bookName,
                genre: genre,
                authorId: author,
            },
            refetchQueries: [{ query: getBooksQuery }],
        });
    }

    return (
        <form id="add-book" onSubmit={addBookForm}>
            <div className="field">
                <label>Book name:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setBookName(e.target.value);
                    }}
                />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setGenre(e.target.value);
                    }}
                />
            </div>
            <div className="field">
                <label>Author:</label>
                <select
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                >
                    <option>Select author</option>
                    {data.authors.map((author) => {
                        return (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        );
                    })}
                </select>
            </div>

            <button>Add Book</button>
        </form>
    );
}
