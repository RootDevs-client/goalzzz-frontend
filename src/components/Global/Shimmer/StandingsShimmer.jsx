export default function StandingsShimmer({ size }) {
  const arr = Array(size).fill(0);

  return (
    <div className="space-y-4 mt-8 mb-2 skew-y-[0.5deg]">
      {arr.map((shimmer, index) => (
        <div className="grid grid-cols-12 gap-3" key={index}>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-2 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
          <div className="col-span-1 h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      ))}
    </div>
  );
}
