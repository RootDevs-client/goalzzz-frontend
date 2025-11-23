'use client';

import { sportMonkUrl } from '@/lib/axios/getAxios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

const AppContent = createContext({});
const AppContextProvider = ({ children }) => {
  const handleApiError = (error) => {
    console.error('API Error:', error);
    toast.error('Something went wrong while processing your request.');
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [selectedSeasonTeam, setSelectedSeasonTeam] = useState('');

  const [isRefetching, setIsRefetching] = useState(false);

  const [checkLive, setCheckLive] = useState(false);

  const [userIp, userSetIP] = useState('');

  // Fetch all Fixtures Data
  const {
    isLoading: isLoadingFixtures,
    data: fixturesData,
    refetch: refetchFixtures,
  } = useQuery(
    `fixtures-${selectedDate}`,
    async () => {
      const response = await sportMonkUrl.get(
        `/fixtures/formatted/date/${selectedDate}?include=league.country;round.stage;participants;state;scores;periods`
      );
      if (response.status === 200) {
        // setIsRefetching(false);
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch all Leagues data');
      }
    },
    {
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (selectedDate) {
      refetchFixtures();
      setIsRefetching(false);
    }
  }, [refetchFixtures, selectedDate]);

  const getData = async () => {
    const fp = await FingerprintJS.load();

    const { visitorId } = await fp.get();
    userSetIP(visitorId);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  const value = {
    userIp,
    isRefetching,
    setIsRefetching,
    checkLive,
    setCheckLive,
    selectedDate,
    setSelectedDate,
    handleApiError,
    isLoadingFixtures,
    fixturesData,
    refetchFixtures,
    selectedSeasonTeam,
    setSelectedSeasonTeam,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};

export default AppContextProvider;

export function useAppContext() {
  const context = useContext(AppContent);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
