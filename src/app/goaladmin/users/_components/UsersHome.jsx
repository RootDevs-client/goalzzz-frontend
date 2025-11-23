'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { useAuthStore } from '@/lib/auth-store';
import useGetAllUsers from '@/lib/hooks/admin/useGetAllUsers';
import Link from 'next/link';
import { useState } from 'react';
import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
    BsGridFill,
} from 'react-icons/bs';
import { FaHome, FaList } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import UsersDeleteModal from './UsersDeleteModal';
import UsersGridView from './UsersGridView';
import UsersListView from './UsersListView';

export default function UsersHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [singleUser, setSingleUser] = useState(null);
  const [isGrid, setIsGrid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    typeof window !== 'undefined'
      ? localStorage?.getItem('usersPageNumber') || 10
      : 10
  );

  const { token } = useAuthStore();

  const { allUsers, allUsersLoading, allUsersRefetch } = useGetAllUsers(token);

  if (allUsersLoading) {
    return <GlobalLoading />;
  }

  const deleteUsersModalHandler = (users) => {
    setSingleUser(users);
    document.getElementById('usersDeleteModal').showModal();
  };

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching.
  }

  function handlePageSizeChange(event) {
    localStorage.setItem('usersPageNumber', event.target.value);
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size.
  }

  const filteredAllUsers = searchQuery
    ? allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allUsers;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const allUsersToDisplay = filteredAllUsers?.slice(startIndex, endIndex);

  function handleNextPage() {
    if (currentPage < Math.ceil(filteredAllUsers.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const totalPages = Math.ceil(filteredAllUsers.length / pageSize);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handlePageNumberClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/goaladmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium text-gray-700">Users</li>
        </ul>
      </div>

      <div className="flex items-center justify-end">
        <Link
          href="/goaladmin/users/create"
          className="btn btn-accent btn-sm btn-outline rounded-md"
        >
          <FaPlus /> Add New User
        </Link>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">User List</h2>
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

        {/* Render QR matches with animations */}
        <div>
          {allUsersToDisplay.length === 0 && (
            <p className="p-10 text-center text-lg font-semibold text-gray-600">
              No Users Data Found
            </p>
          )}
          <div
            className={`${
              isGrid
                ? 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'
                : 'flex w-full flex-col gap-y-5'
            }`}
          >
            {allUsersToDisplay.map((user) => (
              <div key={user._id} id={user._id}>
                {isGrid ? (
                  <UsersGridView
                    user={user}
                    refetch={allUsersRefetch}
                    deleteUsersModalHandler={deleteUsersModalHandler}
                  />
                ) : (
                  <UsersListView
                    user={user}
                    refetch={allUsersRefetch}
                    deleteUsersModalHandler={deleteUsersModalHandler}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {filteredAllUsers.length > pageSize && (
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
      </div>

      <UsersDeleteModal
        token={token}
        singleUser={singleUser}
        allUsersRefetch={allUsersRefetch}
      />
    </div>
  );
}
