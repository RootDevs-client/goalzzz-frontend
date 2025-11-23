import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DeleteAllHighlightModal({
  token,
  allHighlightRefetch,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAllHighlight = async () => {
    setDeleting(true);
    try {
      const { data } = await xoomBackendUrl.delete(
        '/api/admin/highlights/delete-all',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.status) {
        setDeleting(false);
        document.getElementById('highlightDeleteAllModal').close();
        toast.success(data?.message);
        allHighlightRefetch();
      } else {
        setDeleting(false);
        toast.error(data?.message);
      }
    } catch (err) {
      setDeleting(false);
      toast.error('Failed to delete all highlights!');
    }
  };

  return (
    <dialog id="highlightDeleteAllModal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Delete Confirmation!</h3>
        <p className="py-4">
          Do you want to delete
          <span className="font-medium text-red-500"> all Highlight!!!</span>
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <button
            className="btn btn-error btn-sm"
            onClick={handleDeleteAllHighlight}
            disabled={deleting}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
