import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DeleteHighlightModal({
  singleHighlight,
  highlightsRefetch,
}) {
  const [submitting, setSubmitting] = useState(false);

  const deleteHighlightHandler = async (id) => {
    setSubmitting(true);
    try {
      const { data } = await xoomBackendUrl.delete(
        `/api/admin/highlights/${id}`
      );
      if (data.status) {
        setSubmitting(false);
        document.getElementById('highlight_delete_modal').close();
        toast.success(data?.message);
        highlightsRefetch();
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
    <dialog id="highlight_delete_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Confirmation!</h3>
        <p className="py-4">
          Do you want to delete
          <span className="font-medium text-red-500">
            {' '}
            {singleHighlight?.title}{' '}
          </span>
          Highlight?
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
            onClick={() => deleteHighlightHandler(singleHighlight?._id)}
            disabled={submitting}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
