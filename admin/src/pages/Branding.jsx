import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../utils";

const Branding = ({ token }) => {
  const [logo, setLogo] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [currentLogoUrl, setCurrentLogoUrl] = useState("");
  const [currentHeroImageUrl, setCurrentHeroImageUrl] = useState("");

  const fetchBrandingContent = async () => {
    try {
      const navbarResponse = await axios.get(`${backendUrl}/api/content/navbar`);
      if (navbarResponse.data.success) {
        setCurrentLogoUrl(navbarResponse.data.data.content.logoUrl);
      }
      const homeResponse = await axios.get(`${backendUrl}/api/content/home`);
      if (homeResponse.data.success) {
        setCurrentHeroImageUrl(homeResponse.data.data.content.imageUrl);
      }
    } catch (error) {
      console.error("Error fetching branding content:", error);
    }
  };

  useEffect(() => {
    fetchBrandingContent();
  }, []);

  const handleUpload = async (image, type) => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("asset", image);

    try {
      const uploadResponse = await axios.post(`${backendUrl}/api/asset`, formData, {
        headers: { token },
      });

      if (uploadResponse.data.success) {
        const imageUrl = uploadResponse.data.asset.url;
        toast.success("Image uploaded successfully");

        if (type === "logo") {
          await axios.put(`${backendUrl}/api/content/navbar`, { content: { logoUrl: imageUrl } }, { headers: { token } });
          await axios.put(`${backendUrl}/api/content/footer`, { content: { logoUrl: imageUrl } }, { headers: { token } });
          setCurrentLogoUrl(imageUrl);
        } else if (type === "hero") {
          await axios.put(`${backendUrl}/api/content/home`, { content: { imageUrl: imageUrl } }, { headers: { token } });
          setCurrentHeroImageUrl(imageUrl);
        }
        toast.success("Branding updated successfully");
      } else {
        toast.error("Error uploading image");
      }
    } catch (error) {
      toast.error("Error updating branding");
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Branding</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Logo</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Current Logo</h3>
            {currentLogoUrl ? (
              <img src={currentLogoUrl} alt="Current Logo" className="w-48 h-auto" />
            ) : (
              <p>No logo set.</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Upload New Logo</h3>
            <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
            <button onClick={() => handleUpload(logo, "logo")} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Upload Logo</button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Hero Image</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Current Hero Image</h3>
            {currentHeroImageUrl ? (
              <img src={currentHeroImageUrl} alt="Current Hero" className="w-full h-auto" />
            ) : (
              <p>No hero image set.</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Upload New Hero Image</h3>
            <input type="file" onChange={(e) => setHeroImage(e.target.files[0])} />
            <button onClick={() => handleUpload(heroImage, "hero")} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Upload Hero Image</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
