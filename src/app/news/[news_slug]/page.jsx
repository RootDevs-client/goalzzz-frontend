import { xoomBackendUrl } from '@/lib/axios/getAxios';
import SingleNewsDetails from '../_components/SingleNewsDetails';

export const getSingleNews = async (slug) => {
  try {
    const res = await xoomBackendUrl.get(`/api/news/${slug}`);
    return res.data; // Return only the data part of the response
  } catch (error) {
    console.error('Error fetching single news:', error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};

export default async function page({ params }) {
  const { news_slug } = params;

  try {
    const newsData = await getSingleNews(news_slug);

    if (newsData.status) {
      return <SingleNewsDetails newsData={newsData.data} />;
    } else {
      console.error('Server Error:', newsData.message);
      return 'Server Error!';
    }
  } catch (error) {
    console.error('Server Error:', error.message);
    return 'Server Error!';
  }
}
