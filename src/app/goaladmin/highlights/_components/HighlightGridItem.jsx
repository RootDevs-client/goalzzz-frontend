import Link from 'next/link';
import { ImBin } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';

export default function HighlightGridItem({
  highlight,
  deleteHighlightModalHandler,
}) {
  return (
    <div className="flex items-center bg-gray-100 rounded-md gap-x-5 relative">
      <div>
        <img
          src={highlight?.highlight_image}
          alt="Highlight Image"
          className="aspect-video w-52 min-w-[200px] object-cover rounded-l-md"
        />
      </div>
      <div className="flex flex-col justify-between  w-full">
        <div className="pb-6">
          <p className="font-medium">
            Title:{' '}
            <span className="text-gray-700 font-normal text-sm">
              {highlight?.title.slice(0, 30)}
            </span>{' '}
          </p>
          <p className="font-medium text-sm">
            Type:{' '}
            <span className="text-gray-700 font-normal capitalize">
              {highlight?.video_type}
            </span>{' '}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p>
            {' '}
            {highlight.status === '1' ? (
              <div className="badge badge-info">Active</div>
            ) : (
              <div className="badge badge-error">Inactive</div>
            )}
          </p>

          <div className="flex items-center gap-2 p-2">
            <Link
              className="tooltip tooltip-warning"
              data-tip="Edit"
              href={`/goaladmin/highlights/update/${highlight?._id}`}
            >
              <MdEditNote className="text-2xl text-warning" />
            </Link>
            <button
              onClick={() => deleteHighlightModalHandler(highlight)}
              className="tooltip tooltip-error"
              data-tip="Delete"
            >
              <ImBin className="text-xl text-error" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
