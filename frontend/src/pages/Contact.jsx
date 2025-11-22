import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import NewsletterBox from "../components/NewsletterBox";
import { backendUrl } from '../utils';

const Contact = () => {
  const { navigate } = useContext(ShopContext);
  const [content, setContent] = useState({ title: 'CONTACT US', body: '<p className="font-semibold text-xl text-gray-600 ">Our Store</p><p className="text-gray-500 ">Magdaburger Str. 50 <br />14770, Brandenburg an der Havel</p><p className="text-gray-500">Tel: +49-123456789</p><p className="font-semibold text-xl text-gray-600">Moroccan Shop</p><p className="text-gray-500">Learn more about our Teams and job openings</p>' });
  const [titleParts, setTitleParts] = useState(['CONTACT', 'US']);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/contact`);
        if (response.data.success) {
          setContent(response.data.data.content);
          const parts = response.data.data.content.title.split(' ');
          setTitleParts(parts.length > 1 ? [parts[0], parts.slice(1).join(' ')] : [parts[0], '']);
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={titleParts[0]} text2={titleParts[1]} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6" dangerouslySetInnerHTML={{ __html: content.body }}>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
