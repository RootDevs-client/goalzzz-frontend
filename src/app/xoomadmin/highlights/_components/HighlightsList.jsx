'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import PaginationNew from '@/components/Global/PaginationNew';
import { useAuthStore } from '@/lib/auth-store';
import useGetAllHighlights from '@/lib/hooks/admin/useGetAllHighlights';
import { useState } from 'react';
import { BsGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import DeleteAllHighlightModal from './DeleteAllHighlightModal';
import DeleteHighlightModal from './DeleteHighlightModal';
import HighlightGridItem from './HighlightGridItem';
import HighlightListItem from './HighlightListItem';

export default function HighlightsList() {
  const { token } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [singleHighlight, setSingleHighlight] = useState(null);
  const [isGrid, setIsGrid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    typeof window !== 'undefined'
      ? localStorage?.getItem('highlightPageNumber') || 10
      : 10
  );
  const { highlights, highlightsLoading, highlightsRefetch } =
    useGetAllHighlights({ token, page: currentPage, limit: pageSize });

  if (highlightsLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  const deleteHighlightModalHandler = (highlight) => {
    setSingleHighlight(highlight);
    document.getElementById('highlight_delete_modal').showModal();
  };

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching.
  }

  function handlePageSizeChange(event) {
    localStorage.setItem('highlightPageNumber', event.target.value);
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size.
  }

  const filteredHighlights = searchQuery
    ? highlights?.data.filter((match) =>
        match.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : highlights?.data;

  const totalPages = Math.ceil(filteredHighlights?.length / pageSize);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5 text-gray-600">Highlight List</h2>
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

        {/* Dynamic table */}
        <div>
          {filteredHighlights?.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-gray-600 font-medium">
                No highlights available. Add some highlights to the list!
              </p>
            </div>
          )}

          <div
            className={`${
              isGrid
                ? 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 '
                : 'flex w-full flex-col gap-y-5'
            }`}
          >
            {filteredHighlights?.map((highlight) => (
              <div key={highlight?._id} id={highlight?._id}>
                {isGrid ? (
                  <HighlightGridItem
                    highlight={highlight}
                    deleteHighlightModalHandler={deleteHighlightModalHandler}
                  />
                ) : (
                  <HighlightListItem
                    highlight={highlight}
                    deleteHighlightModalHandler={deleteHighlightModalHandler}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <PaginationNew
          totalPages={highlights?.pagination?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {/* Modals */}
      <DeleteHighlightModal
        singleHighlight={singleHighlight}
        highlightsRefetch={highlightsRefetch}
      />
      <DeleteAllHighlightModal
        token={token}
        allHighlightRefetch={highlightsRefetch}
      />
    </div>
  );
}
