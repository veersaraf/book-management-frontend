import React, { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const CreateBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveBook = () => {
        const data = { title, author, publishYear };
        setLoading(true);
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
        axios
            .post(`${API_URL}/books`, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Created successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    setError('Failed to save book. Please try again.');
                }
                console.log(error);
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Create Book</h1>
            {loading && <Spinner />}
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        id="publishYear"
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button
                    className="p-2 bg-sky-300 m-8"
                    onClick={handleSaveBook}
                    disabled={!title || !author || !publishYear}
                >
                    Save
                </button>
            </div>
        </div>
    );
};