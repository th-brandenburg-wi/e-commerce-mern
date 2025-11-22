import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { backendUrl } from "../utils";

const Footer = () => {
  const [content, setContent] = useState({
    description: "",
    phone: "",
    email: "",
    copyright: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/footer`);
        if (response.data.success) {
          setContent(response.data.data.content);
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32 " alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            {content.description}
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">UNTERNEHMEN</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>Über uns</li>
            <li>Lieferung</li>
            <Link to="/Impressum">
              <li>Impressum</li>
            </Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Kontaktieren Sie uns</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>{content.phone}</li>
            <li>{content.email}</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          {content.copyright}
        </p>
      </div>
    </div>
  );
};

export default Footer;
