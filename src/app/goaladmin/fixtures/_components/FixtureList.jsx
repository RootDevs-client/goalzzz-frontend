'use client';

import { sportMonkUrl, xoomBackendUrl } from '@/lib/axios/getAxios';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGear } from 'react-icons/fa6';
import { IoIosFootball } from 'react-icons/io';
import { useQuery } from 'react-query';
import CheckHighlightModal from './CheckHighlightModal';
import FixtureCard from './FixtureCard';

export default function FixtureList({ pickerDate, isFetching, setIsFetching }) {
  const {
    isLoading: isLoadingFixturesAdmin,
    data: fixturesDataAdmin,
    refetch: refetchFixturesAdmin,
  } = useQuery('fixtures-admin', async () => {
    const response = await sportMonkUrl.get(
      `/fixtures/formatted/date/${pickerDate}?include=league.country;round.stage;participants;state;scores;periods`
    );
    if (response.status === 200) {
      setIsFetching(false);
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all Leagues data');
    }
  });

  const [offset, setOffset] = useState(0);
  const [highlightInfo, setHighlightInfo] = useState(0);
  const [isCheckingHighlight, setIsCheckingHighlight] = useState(false);

  useEffect(() => {
    async function getSettings() {
      try {
        const { data } = await xoomBackendUrl.get(
          '/api/admin/administration-settings'
        );

        if (data.status && data?.data?.timezone?.value) {
          setOffset(data.data.timezone.value);
        } else {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center gap-1 border-r border-gray-300 p-1">
                    <FaGear className="text-2xl text-orange-500" />
                    <h4 className="text-orange-400 font-medium text-lg">
                      Warning
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 p-2">
                    <span className="font-semibold">
                      {' '}
                      General Settings is empty.{' '}
                    </span>
                    <br /> Please set your preferred timezone in general
                    settings before creating a match
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between border-l p-4 border-gray-200">
                <Link
                  className="btn btn-sm w-full btn-outline rounded-md btn-success"
                  href="/xoomadmin/general-settings"
                >
                  {' '}
                  Set Now
                </Link>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="btn btn-sm w-full btn-outline rounded-md btn-error"
                >
                  Close
                </button>
              </div>
            </div>
          ));
          // If API response is not available or timezone value is missing, use current location offset
          setOffset(moment().utcOffset());
        }
      } catch (error) {
        console.error('error', error);
        console.error('Error fetching general settings:', error);
        // If there's an error fetching settings, use current location offset
        setOffset(moment().utcOffset());
      }
    }
    getSettings();
  }, []);

  useEffect(() => {
    if (pickerDate) {
      refetchFixturesAdmin();
      setIsFetching(false);
    }
  }, [pickerDate]);

  const handleCheckHighlightModal = async (match) => {
    setIsCheckingHighlight(true);

    const { data } = await xoomBackendUrl.post(
      `/api/admin/fixtures/highlights`,
      {
        fixture_id: match.id,
      }
    );

    if (data.status) {
      if (data?.data.length === 0) {
        toast.success('No highlights available');
      } else {
        setHighlightInfo({ highlights: data.data, matchInfo: match });
        document.getElementById('check_highlight_modal').showModal();
      }
      setIsCheckingHighlight(false);
    } else {
      setIsCheckingHighlight(false);
      toast.error(data?.message);
    }
  };

  const finalFixtures = fixturesDataAdmin?.sort((a, b) => a.id - b.id);

  return (
    <div className="grid grid-cols-1 gap-6 pt-5">
      <div className="panel">
        {isLoadingFixturesAdmin || isFetching ? (
          <div className="flex justify-center border-b border-[#f6f6f657] px-10 pt-10">
            <div className="animate-bounce">
              <IoIosFootball className="animate-spin text-6xl text-blue-400" />
            </div>
          </div>
        ) : (
          <>
            {finalFixtures?.map((league) => (
              <div key={league.id} className="flex flex-col items-center">
                <div className="bg-white w-full">
                  <div className="flex items-center justify-start h-full p-2 px-4 hover:text-secondary border-b border-gray-400">
                    <img
                      src={league?.image}
                      alt="team one"
                      className="w-12 h-12 mr-3 rounded-full"
                    />

                    <h4 className="text-gray-900 text-[16px] font-semibold uppercase">
                      {league?.name}
                    </h4>
                  </div>
                </div>
                <div className="p-2 grid grid-cols-12 items-center gap-2 w-full bg-gray-200 font-semibold rounded-b-xl">
                  <div className="col-span-1">Status</div>
                  <div className="col-span-3">Team One</div>
                  <div className="col-span-3 text-center">Score</div>
                  <div className="col-span-3">Team Two</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y w-full mt-3">
                  {league?.fixtures?.map((match) => (
                    <FixtureCard
                      key={match.id}
                      match={match}
                      offset={offset}
                      isCheckingHighlight={isCheckingHighlight}
                      handleCheckHighlightModal={handleCheckHighlightModal}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Modals */}
      <CheckHighlightModal highlightInfo={highlightInfo} />
    </div>
  );
}
