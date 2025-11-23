import { xoomBackendUrl } from '../axios/getAxios';

export default async function uploadImage(image) {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const { data } = await xoomBackendUrl.post(
      '/api/admin/v2/upload/image/image',
      formData
    );
    return data?.data?.path;
  } catch (error) {
    console.error(error);
    return null;
  }
}
