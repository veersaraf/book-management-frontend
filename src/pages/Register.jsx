import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const handleRegister = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
          setError('Please enter a valid email address');
          return;
        }
        try {
          await axios.post('http://localhost:5555/users/register', { username, email, password });
          navigate('/login');
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError('Registration failed');
          }
        }
      };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                    />
                </div>
                <div className="mb-4">
  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      if (!isValidEmail(e.target.value)) {
        setError('Please enter a valid email address');
      } else {
        setError(null);
      }
    }}
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
    required
  />
</div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-600 text-white p-2 rounded hover:bg-sky-700 transition"
                >
                    Register
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-sky-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};