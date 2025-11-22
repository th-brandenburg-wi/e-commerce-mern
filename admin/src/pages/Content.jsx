import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../utils";

const pageConfig = {
  home: {
    title: { label: "Hero Title", placeholder: "e.g., Latest Arrivals" },
    body: { label: "Hero Subtitle", placeholder: "e.g., OUR BESTSELLERS" },
  },
  about: {
    title: { label: "About Page Title", placeholder: "e.g., ABOUT US" },
    body: { label: "About Page Content", placeholder: "Enter the content for the about page. HTML is supported." },
    thankYouTitle: { label: "Thank You Section Title", placeholder: "e.g., Your Shop Experience matters!" },
    thankYouBody: { label: "Thank You Section Body", placeholder: "e.g., Thank you for choosing us." },
  },
  contact: {
    title: { label: "Contact Page Title", placeholder: "e.g., CONTACT US" },
    body: { label: "Contact Page Content", placeholder: "Enter the content for the contact page. HTML is supported." },
  },
  policy: {
    title: { label: "Policy Section Title", placeholder: "e.g., Our Policy" },
    body: { label: "Policy Section Content", placeholder: "Enter the content for the policy section. HTML is supported." },
  },
  bestseller: {
    title: { label: "Best Seller Section Title", placeholder: "e.g., BEST SELLERS" },
    body: { label: "Best Seller Section Description", placeholder: "Enter the description for the best seller section." },
  },
  latestcollection: {
    title: { label: "Latest Collection Title", placeholder: "e.g., Latest COLLECTION" },
    body: { label: "Latest Collection Description", placeholder: "Enter the description for the latest collection section." },
  },
  newsletter: {
    title: { label: "Newsletter Title", placeholder: "e.g., Abonnieren Sie und bekommen 20% Rabatt" },
    body: { label: "Newsletter Description", placeholder: "Enter the description for the newsletter section." },
  },
  impressum: {
    title: { label: "Impressum Page Title", placeholder: "e.g., Impressum" },
    body: { label: "Impressum Page Content", placeholder: "Enter the content for the impressum page. HTML is supported." },
  },
  relatedproducts: {
    title: { label: "Related Products Title", placeholder: "e.g., Related PRODUCTS" },
    body: { label: "Related Products Description", placeholder: "This is not used in the frontend yet." },
  },
  navbar: {
    title: { label: "Navbar Offer Text", placeholder: "e.g., Angebot" },
    body: { label: "Navbar Body", placeholder: "This is not used in the frontend yet." },
    logoUrl: { label: "Logo URL", placeholder: "Enter the URL for the logo" },
  },
  footer: {
    description: { label: "Footer Description", placeholder: "Enter the description for the footer." },
    phone: { label: "Footer Phone Number", placeholder: "e.g., +49-123456789" },
    email: { label: "Footer Email", placeholder: "e.g., contact@marokko-shop.com" },
    copyright: { label: "Footer Copyright", placeholder: "e.g., Copyright @ 2025 Marokko Shop - All Right Reserved" },
    logoUrl: { label: "Logo URL", placeholder: "Enter the URL for the logo" },
  },
};


const Content = ({ token }) => {
  const [page, setPage] = useState("home");
  const [content, setContent] = useState({});

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/content/${page}`);
      if (response.data.success) {
        setContent(response.data.data.content);
      }
    } catch (error) {
      toast.error("Error fetching content");
    }
  };

  const updateContent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/api/content/${page}`,
        { content },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Content updated successfully");
      } else {
        toast.error("Error updating content");
      }
    } catch (error)
    {
      toast.error("Error updating content");
    }
  };

  useEffect(() => {
    fetchContent();
  }, [page]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const renderForm = () => {
    const config = pageConfig[page];
    if (!config) return null;

    return Object.keys(config).map((key) => {
      const { label, placeholder } = config[key];
      const isTextarea = ['body', 'description'].includes(key) || (config[key].placeholder && config[key].placeholder.includes("HTML"));

      return (
        <div className="mb-4" key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-gray-700">{label}</label>
          {isTextarea ? (
            <textarea
              id={key}
              name={key}
              rows={key === 'description' ? 5 : 10}
              value={content[key] || ''}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          ) : (
            <input
              type="text"
              id={key}
              name={key}
              value={content[key] || ''}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Content Management</h1>
      <div className="flex gap-4 mb-4 flex-wrap">
        <button onClick={() => setPage("home")} className={`px-4 py-2 rounded ${page === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Home</button>
        <button onClick={() => setPage("about")} className={`px-4 py-2 rounded ${page === 'about' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>About</button>
        <button onClick={() => setPage("contact")} className={`px-4 py-2 rounded ${page === 'contact' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Contact</button>
        <button onClick={() => setPage("footer")} className={`px-4 py-2 rounded ${page === 'footer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Footer</button>
        <button onClick={() => setPage("policy")} className={`px-4 py-2 rounded ${page === 'policy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Policy</button>
        <button onClick={() => setPage("bestseller")} className={`px-4 py-2 rounded ${page === 'bestseller' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Best Seller</button>
        <button onClick={() => setPage("latestcollection")} className={`px-4 py-2 rounded ${page === 'latestcollection' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Latest Collection</button>
        <button onClick={() => setPage("newsletter")} className={`px-4 py-2 rounded ${page === 'newsletter' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Newsletter</button>
        <button onClick={() => setPage("impressum")} className={`px-4 py-2 rounded ${page === 'impressum' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Impressum</button>
        <button onClick={() => setPage("navbar")} className={`px-4 py-2 rounded ${page === 'navbar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Navbar</button>
        <button onClick={() => setPage("relatedproducts")} className={`px-4 py-2 rounded ${page === 'relatedproducts' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Related Products</button>
      </div>

      <form onSubmit={updateContent}>
        {renderForm()}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </form>
    </div>
  );
};

export default Content;