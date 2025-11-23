import axios from 'axios';

export const uploadImageToCloudinary = async (image, uploadPreset) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', uploadPreset);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );

  return data.secure_url;
};
