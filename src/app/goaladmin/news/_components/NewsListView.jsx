import Link from 'next/link';
import { ImBin } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';

export default function NewsListView({ news, deleteNewsModalHandler }) {
  return (
    <div className="grid grid-cols-12 items-center bg-gray-100 rounded-md gap-x-5 p-2">
      <div className="col-span-2">
        <img src={news?.image} alt="News Image" className="w-40 h-32" />
      </div>
      <div className="col-span-4">
        <p className="font-medium">
          {news?.title?.length > 100
            ? `${news.title.slice(0, 100)}...`
            : news?.title}
        </p>
      </div>
      <div className="col-span-2 justify-self-center">
        <p className="font-medium">{news?.publish_date}</p>
      </div>
      <div className="col-span-2 justify-self-center">
        {news.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>
      <div className="col-span-2 justify-self-center">
        <Link
          className="btn btn-sm btn-warning rounded-md mb-2 xl:w-[120px]"
          href={`/xoomadmin/news/update/${news?._id}`}
        >
          <span className="hidden xl:block">Edit</span>{' '}
          <MdEditNote className="text-xl" />
        </Link>{' '}
        <button
          className="btn btn-sm btn-error rounded-md mb-2 xl:w-[120px]"
          onClick={() => deleteNewsModalHandler(news)}
        >
          <span className="hidden xl:block">Delete</span>{' '}
          <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
