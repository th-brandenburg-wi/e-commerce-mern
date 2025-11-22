import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../utils";

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
    if (page === 'home' || page === 'about' || page === 'contact' || page === 'policy' || page === 'bestseller' || page === 'latestcollection' || page === 'newsletter' || page === 'impressum') {
      return (
        <>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={content.title || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
            <textarea
              id="body"
              name="body"
              rows="10"
              value={content.body || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        </>
      );
    } else if (page === 'footer') {
      return (
        <>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={content.description || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={content.phone || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={content.email || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="copyright" className="block text-sm font-medium text-gray-700">Copyright</label>
            <input
              type="text"
              id="copyright"
              name="copyright"
              value={content.copyright || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </>
      );
    }
    return null;
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
      </div>

      <form onSubmit={updateContent}>
        {renderForm()}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </form>
    </div>
  );
};

export default Content;
