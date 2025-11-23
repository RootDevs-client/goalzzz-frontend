import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MatchDeleteModal({ singleMatch, refetch }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMatchHandler = async (id) => {
    setIsDeleting(true);
    try {
      const { data } = await xoomBackendUrl.delete(`/api/admin/matches/${id}`);
      if (data.status) {
        setIsDeleting(false);
        document.getElementById('match_delete_modal').close();
        toast.success(data?.message);
        refetch();
      } else {
        setIsDeleting(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setIsDeleting(false);
      console.error(error);
    }
  };
  return (
    <dialog id="match_delete_modal" className="modal">
      <div className="modal-box rounded-md">
        <h3 className="font-bold text-lg">Delete Confirmation!</h3>
        <p className="py-4">
          Do you want to delete
          <span className="font-medium text-red-400 px-2 text-lg">
            {singleMatch?.match_title}
          </span>
          Match?
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
            onClick={() => deleteMatchHandler(singleMatch?.id)}
            disabled={isDeleting}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
