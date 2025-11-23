import Link from 'next/link';
import { ImBin } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';

export default function UsersGridView({ user, deleteUsersModalHandler }) {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center bg-gray-100 rounded-md gap-5 p-2">
      <div className="col-span-1">
        <img
          src={user?.image ? user?.image : `/icons/user-black.png`}
          alt="User Image"
          className="w-40 h-32"
        />
      </div>
      <div className="col-span-1">
        <p className="font-medium">{user.name}</p>
      </div>
      <div className="col-span-1">
        <p>{user.email}</p>
      </div>
      <div className="col-span-1">
        {user.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>
      <div className="col-span-1">
        {' '}
        <Link
          className="btn btn-sm btn-warning"
          href={`/goaladmin/users/update/${user._id}`}
        >
          Edit <MdEditNote className="text-xl" />
        </Link>{' '}
        <button
          className="btn btn-sm btn-error"
          onClick={() => deleteUsersModalHandler(user)}
        >
          Delete <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
