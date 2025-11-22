import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../utils';

const Impressum = () => {
  const [content, setContent] = useState({ title: 'Impressum', body: '' });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/impressum`);
        if (response.data.success) {
          setContent(response.data.data.content);
        }
      } catch (error) {
        console.error('Error fetching impressum content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center border-t py-10 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.title}</h2>
        <div
          className="text-gray-700 space-y-4 text-base"
          dangerouslySetInnerHTML={{ __html: content.body }}
        ></div>
      </div>
    </div>
  );
};

export default Impressum;
