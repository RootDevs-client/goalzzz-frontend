import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddNewsModal({ league, token, refetch, category }) {
  const [isAddNews, setIsAddNews] = useState(false);
  const [newsUrl, setNewsUrl] = useState('');

  useEffect(() => {
    setNewsUrl(league?.newsUrl ? league?.newsUrl : '');
  }, [league]);

  const addNewsUrlHandler = async () => {
    setIsAddNews(true);
    try {
      const { data } = await xoomBackendUrl.patch(
        `/api/admin/popular-${category}/${league?._id}`,
        { ...league, newsUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.status === true) {
        setIsAddNews(false);
        setNewsUrl('');
        refetch();
        toast.success('Successfully add news url!');
        document.getElementById('addNewsUrlModal').close();
      } else {
        toast.error('Failed to add news url!');
      }
    } catch (err) {
      console.error(err);
      setIsAddNews(false);
    }
  };

  return (
    <dialog id="addNewsUrlModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add News URL!</h3>
        <div className="p-2">
          <label
            className="label flex items-center justify-start font-medium text-gray-700"
            htmlFor="title"
          >
            News URL<span className="text-red-500">*</span>
          </label>
          <input
            required
            className="input input-bordered w-full rounded bg-white "
            placeholder="News URL"
            onChange={(e) => setNewsUrl(e.target.value)}
            value={newsUrl}
          />
        </div>
        {/* <div className="mt-3 flex items-center justify-end gap-3">
          <button
            onClick={() => setAddNewsModal(false)}
            type="button"
            className="btn btn-info btn-sm rounded disabled:bg-sky-800 disabled:text-sky-100"
            disabled={isAddNews}
          >
            Cancel
          </button>
          <button
            onClick={() => {}}
            type="button"
            className="btn btn-error btn-sm rounded disabled:bg-rose-800 disabled:text-rose-100"
            disabled={isAddNews}
          >
            submit
            {isAddNews && <ImSpinner className="animate-spin text-base" />}
          </button>
        </div> */}

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <button
            className="btn btn-sm btn-error"
            onClick={addNewsUrlHandler}
            disabled={isAddNews}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
