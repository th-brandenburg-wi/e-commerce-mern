import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { backendUrl } from '../utils';

const Hero = () => {
  const [content, setContent] = useState({ title: 'Latest Arrivals', body: 'OUR BESTSELLERS', imageUrl: assets.hero_img });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/home`);
        if (response.data.success) {
          setContent(response.data.data.content);
        }
      } catch (error) {
        console.error('Error fetching home content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>{content.body}</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>{content.title}</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm  md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
      </div>
      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2' src={content.imageUrl || assets.hero_img} alt="" />
    </div>
  )
}

export default Hero
