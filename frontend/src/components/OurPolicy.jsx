import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../utils';

const OurPolicy = () => {
  const [content, setContent] = useState({ body: '' });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/policy`);
        if (response.data.success) {
          setContent(response.data.data.content);
        }
      } catch (error) {
        console.error('Error fetching policy content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div
      className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '
      dangerouslySetInnerHTML={{ __html: content.body }}
    >
    </div>
  )
}

export default OurPolicy
