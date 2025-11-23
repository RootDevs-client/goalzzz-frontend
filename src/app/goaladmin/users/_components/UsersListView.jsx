import Link from 'next/link';
import { ImBin } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';

export default function UsersListView({ user, deleteUsersModalHandler }) {
  return (
    <div className="grid grid-cols-12 items-center bg-gray-100 rounded-md gap-x-5 p-2">
      <div className="col-span-2">
        <img
          src={user?.image ? user?.image : `/icons/user-black.png`}
          alt="User Image"
          className="w-16 h-16"
        />
      </div>
      <div className="col-span-4">
        <p className="font-medium">{user.name}</p>
      </div>
      <div className="col-span-2 justify-self-center">
        <p className="font-medium">{user.email}</p>
      </div>
      <div className="col-span-2 justify-self-center">
        {user.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>
      <div className="col-span-2 justify-self-center">
        <Link
          className="btn btn-sm btn-warning rounded-md mb-2 xl:w-[120px]"
          href={`/goaladmin/users/update/${user._id}`}
        >
          <span className="hidden xl:block">Edit</span>{' '}
          <MdEditNote className="text-xl" />
        </Link>{' '}
        <button
          className="btn btn-sm btn-error rounded-md mb-2 xl:w-[120px]"
          onClick={() => deleteUsersModalHandler(user)}
        >
          <span className="hidden xl:block">Delete</span>{' '}
          <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
