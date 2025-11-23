import Link from 'next/link';
import { ImBin } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';

export default function HighlightListItem({
  highlight,
  deleteHighlightModalHandler,
}) {
  return (
    <div className="grid grid-cols-12 items-center bg-gray-100 rounded-md gap-x-5 relative">
      <div className="col-span-2">
        <img
          src={highlight?.highlight_image}
          alt="Highlight Image"
          className="aspect-video w-48 object-cover rounded-l-md"
        />
      </div>
      <div className="col-span-4">
        <p className="font-medium">
          Title:{' '}
          <span className="text-gray-700 font-normal">{highlight?.title}</span>{' '}
        </p>
        <p className="font-medium">
          Type:{' '}
          <span className="text-gray-700 font-normal capitalize">
            {highlight?.video_type}
          </span>{' '}
        </p>
      </div>
      <div className="col-span-2 justify-self-center">
        {highlight.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>
      <div className="col-span-4 flex items-center justify-end gap-2 pr-5">
        <Link
          className="btn btn-sm btn-warning"
          href={`/goaladmin/highlights/update/${highlight?._id}`}
        >
          <span className="hidden xl:block">Edit</span>
          <MdEditNote className="text-xl" />
        </Link>
        <button
          onClick={() => deleteHighlightModalHandler(highlight)}
          className="btn btn-sm btn-error"
        >
          <span className="hidden xl:block">Delete</span>
          <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
