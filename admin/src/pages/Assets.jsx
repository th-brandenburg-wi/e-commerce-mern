import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../utils";

const Assets = ({ token }) => {
  const [image, setImage] = useState(null);
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/asset`, {
        headers: { token },
      });
      if (response.data.success) {
        setAssets(response.data.assets);
      }
    } catch (error) {
      toast.error("Error fetching assets");
    }
  };

  const uploadAsset = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("asset", image);

    try {
      const response = await axios.post(
        `${backendUrl}/api/asset`,
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Asset uploaded successfully");
        setImage(null);
        fetchAssets();
      } else {
        toast.error("Error uploading asset");
      }
    } catch (error) {
      toast.error("Error uploading asset");
    }
  };
  
  const deleteAsset = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/asset/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Asset deleted successfully");
        fetchAssets();
      } else {
        toast.error("Error deleting asset");
      }
    } catch (error) {
      toast.error("Error deleting asset");
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Asset Management</h1>

      <div className="mb-8">
        <form onSubmit={uploadAsset}>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Asset Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <div key={asset._id} className="relative">
              <img src={asset.url} alt={asset.name} className="w-full h-auto object-cover rounded-md" />
              <button
                onClick={() => deleteAsset(asset._id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                X
              </button>
              <p className="text-center text-sm mt-2">{asset.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assets;
