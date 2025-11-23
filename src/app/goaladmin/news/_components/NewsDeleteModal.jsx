import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsDeleteModal({ token, singleNews, allNewsRefetch }) {
  const [submitting, setSubmitting] = useState(false);

  const deleteNewsHandler = async (id) => {
    setSubmitting(true);
    try {
      // const { data: deleteImage } = await axios.post(
      //   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      //   {
      //     public_id: 'Goalzzz/bvw5cv6ycvlnfhtz6rgc',
      //     api_key: '611637599981745',
      //     api_secret: 'GF22ahiUd009vI9pncOhZykqXKs',
      //     signature: 'ce8cf016bb508d82acaa528cdb7a23daffe866ae',
      //     timestamp: '2023-12-11T09:52:34Z',
      //   }
      // );

      const { data } = await xoomBackendUrl.delete(`/api/admin/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.status) {
        setSubmitting(false);
        document.getElementById('newsDeleteModal').close();
        toast.success(data?.message);
        allNewsRefetch();
      } else {
        setSubmitting(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  return (
    <dialog id="newsDeleteModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Confirmation!</h3>
        <p className="py-4">
          Do you want to delete
          <span className="font-medium text-red-500">
            {' '}
            {singleNews?.title?.length > 100
              ? `${singleNews?.title.slice(0, 100)}...`
              : singleNews?.title}{' '}
          </span>
          News?
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <button
            className="btn btn-sm btn-error"
            onClick={() => deleteNewsHandler(singleNews?._id)}
            disabled={submitting}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
