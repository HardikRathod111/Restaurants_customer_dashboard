import React, { useState } from 'react';
import { BiImageAdd } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";

function AddCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
    }
  };

  const handleCancel = () => {
    setCategoryName('');
    if (image) {
      URL.revokeObjectURL(image);
      setImage(null);
    }
  };

  const handleAdd = () => {
    setIsSaveModalOpen(true);
  };

 

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-80 md:w-96">
          <h2 className="text-lg font-semibold mb-4">Add Category</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload Item Image</label>
            <div className="border-2 border-dashed border-gray-600 bg-gray-700 rounded-lg p-4 text-center relative">
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
                id="upload"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="upload"
                className="cursor-pointer flex flex-col items-center text-white"
              >
                {!image && (
                  <>
                    <BiImageAdd className="w-10 h-10 mb-2 text-gray-400" />
                    <p><span className="text-blue-500">Upload Image</span> or drag and drop</p>
                  </>
                )}
              </label>

              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}

              {!image && (
                <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 3MB</p>
              )}
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            <a href='/managemenu'
              className="px-12 py-2 ml-4 border border-gray-500 rounded-lg hover:bg-gray-700 transition"
              onClick={handleCancel}
            >
              Cancel
            </a>
            <button
              className={`font-semibold py-2 px-12 rounded-lg shadow-md flex items-center ${categoryName && image ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-600 cursor-not-allowed'} disabled:opacity-50 transition`}
              disabled={!categoryName || !image}
              onClick={handleAdd}
            >
              <MdAddBox className="text-white mr-2" />
              Add
            </button>
          </div>
        </div>
      </div>
      </div>
  );
}

export default AddCategories;
