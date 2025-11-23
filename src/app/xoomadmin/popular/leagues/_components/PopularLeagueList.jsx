'use client';

import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetPopularLeagues from '@/lib/hooks/admin/useGetPopularLeagues';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useAuthStore } from '@/lib/auth-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import { FaVolleyball } from 'react-icons/fa6';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { LuPlus } from 'react-icons/lu';
import { RiCloseCircleFill } from 'react-icons/ri';
import AddChannelModal from './AddChannelModal';
import AddNewsModal from './AddNewsModal';
import LeagueDeleteModal from './LeagueDeleteModal';
import LeagueItem from './LeagueItem';

function PopularLeagueList({ leaguesData }) {
  const [showLeagues, setShowLeagues] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [addingLeague, setAddingLeague] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [singleLeague, setSingleLeague] = useState(null);
  const [leagueList, setLeagueList] = useState([]);

  const { token } = useAuthStore();

  const { popularLeagues, popularLeaguesLoading, popularLeaguesRefetch } =
    useGetPopularLeagues(token);

  useEffect(() => {
    if (!popularLeaguesLoading) {
      setLeagueList(popularLeagues);
    }
  }, [popularLeagues, popularLeaguesLoading]);

  const addNewsModalHandler = (selectedLeague) => {
    setSingleLeague(selectedLeague);
    document.getElementById('addNewsUrlModal').showModal();
  };

  const addChannelModalHandler = (selectedLeague) => {
    setSingleLeague(selectedLeague);
    document.getElementById('addChannelUrlModal').showModal();
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    const searchResult = leaguesData.filter((league) =>
      league.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setShowLeagues(searchResult);
    setShowSearchModal(true);
  };

  const addLeagueHandler = async (league) => {
    try {
      setAddingLeague(true);
      const { data } = await xoomBackendUrl.post(
        '/api/admin/popular-leagues/create',
        {
          id: league?.id,
          name: league?.name,
          image_path: league?.image_path,
          country: league?.country?.name,
          current_season: league?.currentseason?.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.status) {
        setShowSearchModal(false);
        setSearchInput('');
        setAddingLeague(false);
        toast.success(data?.message);
        popularLeaguesRefetch();
      } else {
        setAddingLeague(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setAddingLeague(false);
      console.error(error);
    }
  };

  const deleteLeagueHandler = (league) => {
    setSingleLeague(league);
    document.getElementById('leagueDeleteModal').showModal();
  };

  const selectPointTableHandler = async (id) => {
    try {
      const { data } = await xoomBackendUrl.post(
        '/api/admin/popular-leagues/update/select-point-table',
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.status) {
        popularLeaguesRefetch();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchModal = () => {
    setShowSearchModal(false);
    setSearchInput('');
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = leagueList.findIndex((item) => item.id === active.id);
      const overIndex = leagueList.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(leagueList, activeIndex, overIndex);
      newItems.forEach((item, index) => {
        item.position = index + 1;
      });

      setLeagueList(newItems);

      const leagueIdWithPosition = newItems.map((item) => {
        return { id: item.id, position: item.position };
      });

      try {
        // setIsSorting(true);
        const { data } = await xoomBackendUrl.post(
          '/api/admin/popular-leagues/sort',
          leagueIdWithPosition,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data?.status) {
          // setIsSorting(false);
          toast.success(data?.message);
        }
      } catch (err) {
        // setIsSorting(false);
        toast.error('Failed to sort!');
      } finally {
        // setIsSorting(false);
      }
    }
  };

  return (
    <div>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/xoomadmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium">Popular League</li>
        </ul>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10">
        <h2 className="card-title text-gray-600 mb-2">Search Popular League</h2>
        <div className="form-control w-10/12 lg:w-4/12 relative">
          <input
            className="input input-bordered bg-white pr-10"
            placeholder="Type here..."
            onChange={handleSearch}
            value={searchInput}
          />
          <HiMagnifyingGlass className="text-2xl absolute top-3 right-3" />

          <div
            className={`${
              showSearchModal ? 'block' : 'hidden'
            } max-h-[300px] w-full shadow-md bg-white absolute top-24 z-10 rounded-md`}
          >
            <div className="relative py-2">
              <RiCloseCircleFill
                className="absolute -right-2 -top-2 text-2xl text-secondary cursor-pointer"
                onClick={handleSearchModal}
              />
              <div className="overflow-y-auto px-5 pb-5 pt-10 max-h-[280px]">
                <ul className="w-full rounded-box">
                  {showLeagues.length > 0 ? (
                    <>
                      {showLeagues.map((league) => (
                        <li
                          key={league.league_id}
                          className="grid grid-cols-12 p-2 bg-gray-200 mb-2 rounded-md"
                        >
                          <div className="col-span-8 flex items-center justify-start">
                            <img
                              src={league.image_path}
                              alt="Logo"
                              className="w-[40px] rounded-full"
                            />
                            <span className="font-medium ml-2">
                              {league.name}
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center justify-center">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => addLeagueHandler(league)}
                              disabled={addingLeague}
                            >
                              Add <LuPlus className="text-xl" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className="grid grid-cols-12 p-2 bg-gray-200 mb-2 rounded-md">
                      <div className="col-span-12 flex items-center justify-center">
                        <span className="font-medium ml-2">
                          No League Found!
                        </span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5 text-gray-600">Popular League List</h2>
        <div>
          <div className="w-full rounded-box">
            {popularLeaguesLoading ? (
              <div className="flex justify-center p-5 h-44">
                <div className="animate-bounce">
                  <FaVolleyball className="text-3xl animate-spin text-secondary" />
                </div>
              </div>
            ) : leagueList?.length > 0 ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={leagueList}
                >
                  {leagueList.map((league) => (
                    <LeagueItem
                      key={league._id}
                      league={league}
                      token={token}
                      selectPointTableHandler={selectPointTableHandler}
                      deleteLeagueHandler={deleteLeagueHandler}
                      addNewsModalHandler={addNewsModalHandler}
                      addChannelModalHandler={addChannelModalHandler}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-600 font-medium">
                  No popular leagues available. Add some leagues to the list!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add News Modal  */}
      <AddNewsModal
        league={singleLeague}
        token={token}
        refetch={popularLeaguesRefetch}
        category={'leagues'}
      />

      {/* Add Channel Modal  */}
      <AddChannelModal
        league={singleLeague}
        token={token}
        refetch={popularLeaguesRefetch}
        category={'leagues'}
      />

      <LeagueDeleteModal
        singleLeague={singleLeague}
        token={token}
        popularLeaguesRefetch={popularLeaguesRefetch}
      />
    </div>
  );
}

export default PopularLeagueList;
