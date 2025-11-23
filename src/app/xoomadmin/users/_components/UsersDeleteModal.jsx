import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UsersDeleteModal({
  token,
  singleUser,
  allUsersRefetch,
}) {
  const [submitting, setSubmitting] = useState(false);

  const deleteUserHandler = async (id) => {
    setSubmitting(true);
    try {
      const { data } = await xoomBackendUrl.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.status) {
        setSubmitting(false);
        document.getElementById('usersDeleteModal').close();
        toast.success(data?.message);
        allUsersRefetch();
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
    <dialog id="usersDeleteModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Confirmation!</h3>
        <p className="py-4">
          Do you want to delete{' '}
          <span className="font-medium text-red-500">{singleUser?.name}</span>{' '}
          User?
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
            onClick={() => deleteUserHandler(singleUser?._id)}
            disabled={submitting}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
