import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { BooksTable } from '../components/home/BooksTable';
import { BooksCard } from '../components/home/BooksCard';

export const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/books`)
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
                <div className="flex gap-x-4">
                    <button
                        className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                        onClick={() => setShowType('table')}
                    >
                        Table
                    </button>
                    <button
                        className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                        onClick={() => setShowType('card')}
                    >
                        Card
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to="/books/create" aria-label="Add new book">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <BooksTable books={books} />
            ) : (
                <BooksCard books={books} />
            )}
        </div>
    );
};