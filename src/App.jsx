import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateBooks } from './pages/CreateBooks';
import { DeleteBook } from './pages/DeleteBook';
import { EditBook } from './pages/EditBook';
import { Home } from './pages/Home';
import { ShowBook } from './pages/ShowBook';
import { Login } from './pages/Login';
import { Register } from './pages/Register'; // Optional
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/details/:id" element={<ShowBook />} />
            <Route path="/books/create" element={<ProtectedRoute><CreateBooks /></ProtectedRoute>} />
            <Route path="/books/edit/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
            <Route path="/books/delete/:id" element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Optional */}
        </Routes>
    );
};

export default App;