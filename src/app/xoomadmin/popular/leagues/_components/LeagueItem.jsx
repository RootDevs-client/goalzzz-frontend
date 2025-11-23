import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillYoutube } from 'react-icons/ai';
import { FaNewspaper } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { ImBin } from 'react-icons/im';
import { MdDragIndicator } from 'react-icons/md';

function LeagueItem({
  league,
  selectPointTableHandler,
  deleteLeagueHandler,
  addNewsModalHandler,
  addChannelModalHandler,
  token,
}) {
  const [isAddNews, setIsAddNews] = useState(false);
  const [isAddHighlight, setIsAddHighlight] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: league.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleAutoFetchNews = async (league) => {
    setIsAddNews(true);
    try {
      if (league?.newsUrl) {
        const { data } = await xoomBackendUrl.post(
          `/api/admin/news/auto-generate`,
          { newsUrl: league.newsUrl, league, categoryType: 'league' },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data?.status === true) {
          setIsAddNews(false);
          toast.success(`You've successfully fetched ${data?.newsCount} news`);
        } else {
          toast.error('Failed to fetch news!');
        }
      } else {
        toast.error('There is no news url! please set a news url!');
        setIsAddNews(false);
      }
    } catch (err) {
      console.error(err);
      setIsAddNews(false);
    }
  };

  const handleAutoFetchHighlight = async (league) => {
    setIsAddHighlight(true);
    try {
      if (league?.channelId) {
        const { data } = await xoomBackendUrl.post(
          `/api/admin/highlights/youtube-videos`,
          {
            channelId: league.channelId,
            category: league,
            categoryType: 'league',
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data?.status === true) {
          setIsAddHighlight(false);
          toast.success(
            `You've successfully fetched ${data?.highlightsCount} highlights`
          );
        } else {
          toast.error('Failed to fetch news!');
        }
      } else {
        toast.error('There is no Channel Id! please set a Channel Id!');
        setIsAddHighlight(false);
      }
    } catch (err) {
      console.error(err);
      setIsAddHighlight(false);
    }
  };

  return (
    <div
      className="p-2 bg-gray-100 mb-2 rounded-md"
      ref={setNodeRef}
      style={style}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-8 flex items-center justify-start">
          <MdDragIndicator
            className="cursor-grab text-xl outline-none"
            {...attributes}
            {...listeners}
          />
          <img
            src={league?.image_path}
            alt="Logo"
            className="w-[40px] rounded-full"
          />
          {/* <span className="font-medium ml-2">{league?.name}</span> */}
          <p className="mx-4">
            {league.name}{' '}
            {league?.newsUrl && (
              <>
                <br /> <span className="my-1 text-xs">{league?.newsUrl}</span>
              </>
            )}{' '}
            {league.channelId && (
              <>
                <br />{' '}
                <span className="text-xs">ChannelID - {league?.channelId}</span>
              </>
            )}
          </p>
        </div>
        <div className="col-span-4 flex items-center justify-around">
          <div className="flex items-center gap-3">
            <span>Select Point Table</span>
            <input
              type="radio"
              name="select-point-table"
              className="radio radio-error"
              onChange={() => selectPointTableHandler(league.id)}
              checked={league.show_point_table === 1}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => addChannelModalHandler(league)}
              className="tooltip tooltip-info -ms-px inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              data-tip="Add Youtube Channel"
            >
              <AiFillYoutube className="text-black-500 cursor-pointer text-xl" />
            </button>
            <button
              disabled={league?.channelId ? false : true}
              onClick={() => handleAutoFetchHighlight(league)}
              type="button"
              className="tooltip tooltip-info -ms-px inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              data-tip="Fetch Highlights"
            >
              <HiOutlineRefresh
                className={`text-black-500 ${
                  isAddHighlight && 'animate-spin cursor-pointer'
                } ${league?.channelId && 'text-green-500'} text-xl`}
              />
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => addNewsModalHandler(league)}
              className="tooltip tooltip-info -ms-px inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              data-tip="Add News Url"
            >
              <FaNewspaper className="text-black-500 cursor-pointer text-xl" />
            </button>
            <button
              disabled={league?.newsUrl ? false : true}
              onClick={() => handleAutoFetchNews(league)}
              type="button"
              className="tooltip tooltip-info -ms-px inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              data-tip="Fetch News"
            >
              <HiOutlineRefresh
                className={`text-black-500 ${
                  isAddNews && 'animate-spin cursor-pointer'
                } ${league?.newsUrl && 'text-green-500'} text-xl`}
              />
            </button>
          </div>

          <button
            className="btn btn-sm btn-error"
            onClick={() => deleteLeagueHandler(league)}
          >
            Delete <ImBin className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeagueItem;
