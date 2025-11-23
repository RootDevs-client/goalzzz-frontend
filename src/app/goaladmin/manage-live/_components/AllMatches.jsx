'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetAllMatches from '@/lib/hooks/useGetAllMatches';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsGridFill,
} from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import MatchDeleteModal from './MatchDeleteModal';
import MatchGridView from './MatchGridView';
import MatchListView from './MatchListView';
import StreamingSortModal from './StreamingSortModal';

export default function AllMatches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGrid, setIsGrid] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    typeof window !== 'undefined'
      ? localStorage?.getItem('livePageNumber') || 10
      : 10
  );
  const [singleMatch, setSingleMatch] = useState(null);
  const [liveMatches, setLiveMatches] = useState([]);

  const { allMatches, allMatchesLoading, allMatchesRefetch, allMatchesError } =
    useGetAllMatches();

  useEffect(() => {
    if (!allMatchesLoading) {
      setLiveMatches(allMatches);
    }
  }, [allMatches, allMatchesLoading]);

  if (allMatchesLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  if (allMatchesError) {
    console.error('An error occurred while fetching data:', allMatchesError);
    return <div>Error loading data</div>;
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching.
  }

  function handlePageSizeChange(event) {
    localStorage.setItem('livePageNumber', event.target.value);
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size.
  }

  const deleteMatchModalHandler = (match) => {
    setSingleMatch(match);
    document.getElementById('match_delete_modal').showModal();
  };

  const sortStreamingModalHandler = (match) => {
    setSingleMatch(match);
    document.getElementById('sort_streaming_modal').showModal();
  };

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = liveMatches.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = liveMatches.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(liveMatches, activeIndex, overIndex);
      newItems.forEach((item, index) => {
        item.position = index + 1;
      });

      setLiveMatches(newItems);

      const matchIdWithPosition = newItems.map((item) => {
        return { _id: item._id, position: item.position };
      });

      try {
        setIsSorting(true);
        const { data } = await xoomBackendUrl.post(
          '/api/admin/matches/sort',
          matchIdWithPosition
        );
        if (data?.status) {
          setIsSorting(false);
          toast.success('Live Match Sorted Successfully!');
        }
      } catch (err) {
        setIsSorting(false);
        toast.error('Failed to sort!');
      } finally {
        setIsSorting(false);
      }
    }
  }

  const filteredAllMatches = searchQuery
    ? liveMatches.filter(
        (match) =>
          match.match_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (match.team_one_name &&
            match.team_one_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (match.team_one_name &&
            match.team_one_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : liveMatches;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const allMatchesToDisplay = filteredAllMatches?.slice(startIndex, endIndex);

  function handleNextPage() {
    if (currentPage < Math.ceil(filteredAllMatches.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const totalPages = Math.ceil(filteredAllMatches.length / pageSize);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handlePageNumberClick(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <div>
      {/* Page size selector */}
      <div className="my-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or ID"
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
            <label htmlFor="pageSizeSelect" className="mr-2 mt-2">
              Page Size:
            </label>
            <select
              id="pageSizeSelect"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="rounded border px-2 py-1"
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

      {/* Render QR matches with animations */}
      <div>
        <h4 className="my-3 text-lg font-medium uppercase">All Matches</h4>
        {allMatchesToDisplay.length === 0 && (
          <p className="p-10 text-center text-lg font-semibold text-gray-600">
            No results found. It seems the list is empty.
          </p>
        )}
        <div
          className={`${
            isGrid
              ? 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'
              : 'flex w-full flex-col'
          }`}
        >
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              strategy={
                isGrid
                  ? horizontalListSortingStrategy
                  : verticalListSortingStrategy
              }
              items={allMatchesToDisplay}
            >
              {allMatchesToDisplay.map((match) => (
                <div key={match.id} id={match.id}>
                  {isGrid ? (
                    <MatchGridView
                      match={match}
                      refetch={allMatchesRefetch}
                      deleteMatchModalHandler={deleteMatchModalHandler}
                      sortStreamingModalHandler={sortStreamingModalHandler}
                      isSorting={isSorting}
                    />
                  ) : (
                    <MatchListView
                      match={match}
                      refetch={allMatchesRefetch}
                      deleteMatchModalHandler={deleteMatchModalHandler}
                      sortStreamingModalHandler={sortStreamingModalHandler}
                      isSorting={isSorting}
                    />
                  )}
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Pagination */}

      {filteredAllMatches.length > pageSize && (
        <div className="my-4 flex justify-center">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <BsFillArrowLeftSquareFill
              className={`rounded-l text-3xl font-semibold ${
                currentPage === 1
                  ? 'text-gray-300'
                  : 'text-blue-500 hover:text-blue-600'
              } `}
            />
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageNumberClick(pageNumber)}
              className={`mx-1 rounded hover:bg-blue-500 hover:text-white ${
                pageNumber === currentPage
                  ? 'bg-blue-500 text-white h-8 w-8'
                  : 'border border-blue-300 bg-white text-blue-500 h-8 w-8'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <BsFillArrowRightSquareFill
              className={`rounded-r text-3xl font-semibold ${
                currentPage === totalPages
                  ? 'text-gray-300'
                  : 'text-blue-500 hover:text-blue-600'
              }`}
            />
          </button>
        </div>
      )}

      {/* Modals */}
      <MatchDeleteModal singleMatch={singleMatch} refetch={allMatchesRefetch} />
      <StreamingSortModal singleMatch={singleMatch} />
    </div>
  );
}
