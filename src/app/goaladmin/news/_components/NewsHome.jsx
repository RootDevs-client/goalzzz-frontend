'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import PaginationNew from '@/components/Global/PaginationNew';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { useQuery } from 'react-query';
import NewsDeleteModal from './NewsDeleteModal';
import NewsGridView from './NewsGridView';
import NewsListView from './NewsListView';

export default function NewsHome() {
  const { token } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [singleNews, setSingleNews] = useState(null);
  const [isGrid, setIsGrid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    typeof window !== 'undefined'
      ? parseInt(localStorage?.getItem('newsPageNumber')) || 10
      : 10
  );

  const {
    isLoading: allNewsLoading,
    data: allNews,
    refetch: allNewsRefetch,
  } = useQuery(
    ['admin-all-news', currentPage, pageSize],
    async () => {
      const response = await xoomBackendUrl.get(
        `/api/admin/news?page=${currentPage}&limit=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch all news data!');
      }
    },
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    allNewsRefetch();
    setCurrentPage(1);
  }, [searchQuery, allNewsRefetch]);

  if (allNewsLoading) {
    return <GlobalLoading />;
  }

  const deleteNewsModalHandler = (news) => {
    setSingleNews(news);
    document.getElementById('newsDeleteModal').showModal();
  };

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function handlePageSizeChange(event) {
    localStorage.setItem('newsPageNumber', event.target.value);
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  }

  const filteredAllNews = searchQuery
    ? allNews?.data?.filter((match) =>
        match.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allNews?.data;

  return (
    <div>
      <div className="flex items-center justify-end">
        <Link
          href="/admin/news-home/create"
          className="btn btn-primary btn-sm rounded-md"
        >
          <FaPlus /> Add New News
        </Link>
      </div>

      <div className="card mt-5 w-full bg-white px-5 py-10 shadow-md">
        <h2 className="card-title mb-5 text-gray-700">News List</h2>
        {/* Page size selector */}
        <div className="my-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="w-60 rounded border p-2 transition-all duration-300 ease-linear focus:w-80 focus:outline-blue-500"
          />
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="tooltip" data-tip="List view">
                <FaList
                  onClick={() => setIsGrid(false)}
                  className={`cursor-pointer border border-gray-200 p-1 text-3xl ${
                    !isGrid && 'text-blue-500'
                  }`}
                />
              </div>
              <div className="tooltip" data-tip="Grid view">
                <BsGridFill
                  onClick={() => setIsGrid(true)}
                  className={`cursor-pointer border border-gray-200 p-1 text-3xl ${
                    isGrid && 'text-blue-500'
                  }`}
                />
              </div>
            </div>
            <div className="gap-w flex items-center">
              <label htmlFor="pageSizeSelect" className="mr-2 font-medium">
                Page Size:
              </label>
              <select
                id="pageSizeSelect"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="rounded border px-2 py-1 outline-none"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>

        {/* All News Views */}
        <div>
          {filteredAllNews?.length === 0 && (
            <div className="p-4 text-center">
              <p className="font-medium text-gray-600">
                No news available. Add some news to the list!
              </p>
            </div>
          )}
          <div
            className={`${
              isGrid
                ? 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4'
                : 'flex w-full flex-col gap-y-5'
            }`}
          >
            {filteredAllNews?.map((news) => (
              <div key={news._id} id={news._id}>
                {isGrid ? (
                  <NewsGridView
                    news={news}
                    refetch={allNewsRefetch}
                    deleteNewsModalHandler={deleteNewsModalHandler}
                  />
                ) : (
                  <NewsListView
                    news={news}
                    refetch={allNewsRefetch}
                    deleteNewsModalHandler={deleteNewsModalHandler}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <PaginationNew
          totalPages={allNews?.pagination?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <NewsDeleteModal
        token={token}
        singleNews={singleNews}
        allNewsRefetch={allNewsRefetch}
      />
    </div>
  );
}
