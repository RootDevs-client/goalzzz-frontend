import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import moment from 'moment';
import Link from 'next/link';
import { BsSortUpAlt } from 'react-icons/bs';
import { FaEdit, FaRegClone, FaTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';

export default function MatchGridView({
  match,
  isSorting,
  deleteMatchModalHandler,
  sortStreamingModalHandler,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: match.id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      className={`rounded-md border border-gray-300 bg-white p-2 ${
        isSorting && 'animate-pulse'
      }`}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center justify-between border-b border-gray-300 p-2">
        <div>
          <img
            src={match.team_one_image}
            alt="Image"
            className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
          />
          <p className="mt-1 text-center font-bold">{match?.team_one_name}</p>
        </div>

        <div>
          <p className="mb-1 text-center text-lg font-bold">
            {match.match_title}
          </p>
          <p className="text-center text-gray-600">
            {moment(match.time).format('MMM Do YYYY / h:mm')}
          </p>

          <p className="mt-3 border-t border-gray-200 pt-2 text-center font-bold text-gray-500">
            VS
          </p>
        </div>

        <div>
          <img
            src={match.team_two_image}
            alt="Image"
            className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
          />
          <p className="mt-1 text-center font-bold">{match?.team_two_name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-2">
        <h4
          className={`w-fit caption-top rounded-full px-2 py-1 text-sm capitalize text-white shadow-lg ${
            match.status === '1' ? 'bg-green-400' : 'bg-red-400'
          } `}
        >
          {match.status === '1' ? 'active' : 'in-active'}
        </h4>

        <div className="flex items-center gap-2">
          <p
            onClick={() => sortStreamingModalHandler(match)}
            className=" cursor-pointer flex items-center justify-center rounded-full border border-gray-200 px-2 py-0.5 text-gray-600"
          >
            Streams: {match.streaming_sources.length}
          </p>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="tooltip" data-tip="Source Sort">
            <BsSortUpAlt
              className="cursor-pointer text-lg text-gray-900 hover:text-gray-700"
              onClick={() => sortStreamingModalHandler(match)}
            />
          </div>
          <div className="tooltip tooltip-info" data-tip="Clone">
            <Link
              href={`/goaladmin/manage-live/clone/${match.id}`}
              className="pt-[6px]"
            >
              <FaRegClone className="text-lg text-blue-400 hover:text-blue-500" />
            </Link>
          </div>
          <div className="tooltip tooltip-info" data-tip="Edit">
            <Link
              href={`/goaladmin/manage-live/update/${match.id}`}
              className=""
            >
              <FaEdit className="text-xl text-blue-400 hover:text-blue-500" />
            </Link>
          </div>
          <div className="tooltip tooltip-error" data-tip="Delete">
            <button
              onClick={() => deleteMatchModalHandler(match)}
              className="pt-[6px]"
            >
              <FaTrashAlt className="text-lg text-red-400 hover:text-red-500" />
            </button>
          </div>
          <div className="tooltip" data-tip="Drag">
            <MdDragIndicator
              className="cursor-grab text-xl outline-none"
              {...attributes}
              {...listeners}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
