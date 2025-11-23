import LiveMatchCard from './LiveMatchCard';
export default function LiveMatchTab({ liveMatches }) {
  // const {
  //   data: liveMatches,
  //   error: liveMatchesError,
  //   isLoading: liveMatchesLoading,
  //   refetch: liveMatchesRefetch,
  // } = useQuery('liveMatches', async () => {
  //   const { data } = await xoomBackendUrl.get('/api/live-matches');
  //   return data?.data;
  // });

  // const shimmerCount = [1, 2, 3, 4, 5];
  // if (liveMatchesLoading) {
  //   return (
  //     <div>
  //       {shimmerCount.map((count) => (
  //         <div key={count}>
  //           <div className="bg-[#F5F5F5] -skew-y-[0.5deg] px-6 py-2">
  //             <div className="mt-2  h-6 w-36 bg-white animate-pulse rounded-md"></div>
  //             <div className="mt-2  h-3 w-20 bg-white animate-pulse rounded-md"></div>
  //           </div>
  //           <div className="bg-[#F0F0F0] -skew-y-[0.5deg] flex items-center justify-between p-6">
  //             <div className="flex flex-col gap-1 skew-y-[0.5deg]">
  //               <div className="flex items-center gap-1 ">
  //                 <div className="mt-2  w-8 h-8 bg-white animate-pulse rounded-full"></div>
  //                 <div className="mt-2  h-3 w-20 bg-white animate-pulse rounded-md"></div>
  //               </div>
  //               <div className="flex items-center gap-1">
  //                 <div className="mt-2  w-8 h-8 bg-white animate-pulse rounded-full"></div>
  //                 <div className="mt-2  h-3 w-20 bg-white animate-pulse rounded-md"></div>
  //               </div>
  //             </div>
  //             <div className="skew-y-[0.5deg] flex flex-col items-end ">
  //               <div className="mt-2  h-3 w-32 bg-white animate-pulse rounded-md"></div>
  //               <div className="mt-2  h-3 w-16 bg-white animate-pulse rounded-md "></div>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div>
      {liveMatches && liveMatches.length > 0 ? (
        liveMatches.map((match) => (
          <LiveMatchCard key={match?.id} match={match} />
        ))
      ) : (
        <div className="p-2 font-medium text-center text-gray-600">
          No live matches found at the moment. Check back later or explore other
          sections!
        </div>
      )}
    </div>
  );
}
