import Link from 'next/link';
import { ImBin } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';

export default function NewsGridView({ news, deleteNewsModalHandler }) {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center bg-gray-100 rounded-md gap-5 p-2">
      <div className="col-span-1">
        <img src={news?.image} alt="News Image" className="w-40 h-32" />
      </div>
      <div className="col-span-1">
        <p className="font-medium">
          {news?.title.length > 100
            ? `${news.title.slice(0, 100)}...`
            : news.title}
        </p>
      </div>
      <div className="col-span-1">
        <p>{news.publish_date}</p>
      </div>
      <div className="col-span-1">
        {news.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>
      <div className="col-span-1">
        {' '}
        <Link
          className="btn btn-sm btn-warning"
          href={`/goaladmin/news/update/${news._id}`}
        >
          Edit <MdEditNote className="text-xl" />
        </Link>{' '}
        <button
          className="btn btn-sm btn-error"
          onClick={() => deleteNewsModalHandler(news)}
        >
          Delete <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
