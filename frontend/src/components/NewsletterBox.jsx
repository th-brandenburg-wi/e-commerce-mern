import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../utils';

const NewsletterBox = () => {
  const [content, setContent] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/newsletter`);
        if (response.data.success) {
          setContent(response.data.data.content);
        }
      } catch (error) {
        console.error('Error fetching newsletter content:', error);
      }
    };

    fetchContent();
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>{content.title}</p>
      <p className='text-gray-400 mt-3'>{content.body}</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" placeholder='Ihre Email' className='w-full sm:flex-1 outline-none' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>ABONNIEREN</button>
      </form>
    </div>
  );
};

export default NewsletterBox;
