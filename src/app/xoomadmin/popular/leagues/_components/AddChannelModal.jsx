import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddChannelModal({ league, token, refetch, category }) {
  const [isAddChannel, setIsAddChannel] = useState(false);
  const [channelUrl, setChannelUrl] = useState('');

  useEffect(() => {
    setChannelUrl(league?.channelId ? league?.channelId : '');
  }, [league]);

  const addChannelUrlHandler = async () => {
    setIsAddChannel(true);
    try {
      const { data } = await xoomBackendUrl.patch(
        `/api/admin/popular-${category}/${league?._id}`,
        { ...league, channelId: channelUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.status === true) {
        setIsAddChannel(false);

        setChannelUrl('');
        refetch();
        toast.success('Successfully add Channel Id!');
        document.getElementById('addChannelUrlModal').close();
      } else {
        toast.error('Failed to add Channel Id!');
      }
    } catch (err) {
      console.error(err);
      setIsAddChannel(false);
    }
  };

  return (
    <dialog id="addChannelUrlModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Channel URL!</h3>
        <div className="p-2">
          <label
            className="label flex items-center justify-start font-medium text-gray-700"
            htmlFor="title"
          >
            Channel URL<span className="text-red-500">*</span>
          </label>
          <input
            required
            className="input input-bordered w-full rounded bg-white "
            placeholder="Channel URL"
            onChange={(e) => setChannelUrl(e.target.value)}
            value={channelUrl}
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
            onClick={addChannelUrlHandler}
            disabled={isAddChannel}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
