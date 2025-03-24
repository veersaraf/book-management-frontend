import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';

export const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
  useEffect(()=> {
    setLoading(true);
    axios 
      .get(`${API_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      }) 
  }, [])
  return (
    <div className='p-4'>
      <BackButton />
      {
        loading? (
          <Spinner/>
        ):(
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <h1>Stats</h1>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Updated Time</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        )}
    </div>
  )
}
