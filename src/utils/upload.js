
import axios from 'axios';

const CLOUD_NAME = 'dkplhsxht';
const UPLOAD_PRESET = 'ml_default';  // Set this in your Cloudinary settings

export const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
 
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name',CLOUD_NAME)
  try {
    const response = await axios.post(url, formData);
    
    return response.data.secure_url; 
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
