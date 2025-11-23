'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import { useQuery } from 'react-query';

export default function NewsHome() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoadMore, setIsLoadMore] = useState(false);
  // Fetch all News Data

  const {
    isLoading: isLoadingNews,
    data: newsData,
    refetch: refetchNews,
  } = useQuery(
    [`news-data`, limit],
    async () => {
      const response = await xoomBackendUrl.get(
        `/api/news?page=${page}&limit=${limit}`
      );
      if (response.status === 200) {
        // setIsRefetching(false);
        return response.data;
      } else {
        throw new Error('Failed to fetch all Leagues data');
      }
    },
    {
      // cacheTime: 0,
      keepPreviousData: true,
    }
  );

  if (isLoadingNews) {
    return (
      <div>
        <GlobalLoading />
      </div>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="bg-black h-[250px] grid grid-cols-1 content-center -skew-y-[0.5deg]">
        <div className="p-2 font-medium text-center text-gray-300 skew-y-[0.5deg]">
          No news found at the moment. Stay tuned for updates!
        </div>
      </div>
    );
  }

  const truncate = (input) =>
    input?.length > 70 ? `${input.substring(0, 70)}...` : input;

  const handleLoadMore = async () => {
    setIsLoadMore(true);
    setLimit((prev) => prev + 10);
    await refetchNews();
    setIsLoadMore(false);
  };

  return (
    <div className="-mt-4 sm:-mt-0">
      <Link href={`/news/${newsData?.data[0]?.slug}`}>
        <div className="bg-black h-[390px] sm:h-[250px] grid grid-cols-1 content-center -skew-y-[2deg] sm:-skew-y-[0.5deg]">
          <div className="flex flex-col sm:grid grid-cols-2 gap-6 bg-none rounded-none text-white sm:px-10 py-10">
            <div className="w-full sm:w-72 h-full skew-y-[2deg] sm:skew-y-[0.5deg] mt-16 sm:mt-0 sm:py-[4px] relative ">
              <img
                src={newsData?.data[0]?.image}
                alt="HighlightImg"
                width={100}
                height={100}
                className="w-full sm:h-44 sm:w-72 p-0 sm:p-[7px]"
              />

              <div className="absolute -bottom-3 sm:bottom-0 right-0 me-7 ">
                <h2 className="animate-pulse text-red-500 bg-white px-2 font-bold">
                  EXCLUSIVE
                </h2>
              </div>
            </div>

            <div className="my-12 pb-4 sm:my-8 -mt-2 ml-2 sm:ml-10 skew-y-[2deg] sm:skew-y-[0.5deg]">
              <h2 className="card-title text-sm">
                {' '}
                {truncate(newsData?.data[0]?.title)}{' '}
              </h2>
              <small className="text-[11px] font-normal mt-3 sm:mt-0">
                {moment(
                  newsData?.data[0]?.publish_date,
                  'YYYY-MM-DD HH:mm'
                ).format('ddd, DD MMM YYYY')}
              </small>
            </div>
          </div>
        </div>
      </Link>

      <div className="py-2 mt-8 ">
        <h4 className="font-semibold ml-2">TOP STORIES</h4>
        <div className="sm:flex flex-wrap justify-between ml-2 sm:ml-0">
          {newsData?.data.slice(1).map((news) => (
            <div key={news._id}>
              <Link href={`/news/${news?.slug}`}>
                <div className="w-full my-5 card sm:w-72 rounded-none flex flex-row sm:flex-col">
                  <div className="bg-black sm:w-full -skew-y-[3deg] sm:-skew-y-[0.5deg]">
                    <figure>
                      <img
                        src={news?.image}
                        alt="HighlightImg"
                        width={100}
                        height={100}
                        className="max-w-fit sm:w-72 sm:h-44 skew-y-[0.5deg] py-[4px]"
                        sizes="sm:100vw"
                      />
                    </figure>
                  </div>

                  <div className="flex items-center mx-5 sm:mx-0">
                    <div>
                      <h2 className="text-sm font-semibold my-2 ">
                        {news?.title.length > 50
                          ? news?.title.slice(0, 50)
                          : news?.title}
                        ...
                      </h2>
                      <small className="text-[11px] font-normal mt-2 sm:mt-0 text-base-00">
                        {moment(news?.publish_date, 'YYYY-MM-DD HH:mm').format(
                          'ddd, DD MMM YYYY'
                        )}
                      </small>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {newsData?.totalNews > newsData?.data?.length && (
        <div className="flex justify-center mb-5">
          <button
            onClick={handleLoadMore}
            className="btn btn-error btn-outline btn-sm rounded-md"
            disabled={isLoadMore}
          >
            {isLoadMore ? <ImSpinner className="ml-2 animate-spin" /> : ''} Load
            More
          </button>
        </div>
      )}
    </div>
  );
}
