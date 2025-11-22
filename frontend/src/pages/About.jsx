import React, { useState, useEffect } from "react";
import axios from 'axios';
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { backendUrl } from '../utils';

const About = () => {
  const [content, setContent] = useState({ 
    title: 'ABOUT US', 
    body: '<p>Welcome to our e-commerce platform! We are passionate about delivering quality products and a seamless shopping experience. Our mission is to connect you with the best brands and unique finds, all in one place.</p><b className="text-gray-800"> Our Mission</b><p className="text-gray-600 mb-4">Our team is dedicated to customer satisfaction, innovation, and reliability. Whether you\'re shopping for the latest trends or everyday essentials, we strive to make your journey enjoyable and secure.</p>',
    thankYouTitle: 'Your Shop Experience matters!',
    thankYouBody: 'Thank you for choosing us. We look forward to serving you and making your online shopping experience exceptional!'
  });
  const [titleParts, setTitleParts] = useState(['ABOUT', 'US']);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/about`);
        if (response.data.success) {
          setContent(response.data.data.content);
          const parts = response.data.data.content.title.split(' ');
          setTitleParts(parts.length > 1 ? [parts[0], parts.slice(1).join(' ')] : [parts[0], '']);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={titleParts[0]} text2={titleParts[1]} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600" dangerouslySetInnerHTML={{ __html: content.body }}>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={"THANK"} text2={"YOU"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>{content.thankYouTitle}</b>
          <p>
            {content.thankYouBody}
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
