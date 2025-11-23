export default function PlayerProfile({ playerData }) {
  function findRecentSeasonStats(statistics) {
    return statistics.find((item) => {
      return (
        item?.has_values === true &&
        item?.season?.is_current === true &&
        item?.season?.league?.sub_type === 'domestic'
      );
    });
  }

  const recentSeasonStats = findRecentSeasonStats(playerData?.statistics);

  function transformDetailsToObject(details) {
    return details?.reduce((result, { type, value }) => {
      result[type.developer_name] = value.total;
      return result;
    }, {});
  }

  const playerStats = transformDetailsToObject(recentSeasonStats?.details);

  const age = calculateAge(playerData?.date_of_birth);
  const formattedAmount = formatMoney(playerData?.transfers[0]?.amount);

  const displayIfNullOrUndefined = (value, postfix = '') =>
    value !== null && value !== undefined ? `${value} ${postfix}` : '--';

  return (
    <div className="skew-y-[0.5deg] mt-6">
      <div className="grid grid-cols-10 sm:grid-cols-8 w-11/12 sm:w-8/12 mx-auto">
        <div className="h-24 col-span-3 border-b border-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="font-semibold text-lg">
              {displayIfNullOrUndefined(playerData?.height, 'cm')}
            </h4>
            <p className="text-sm text-gray-600">Height</p>
          </div>
        </div>
        <div className="h-24 col-span-4 sm:col-span-2 border-x border-b border-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="font-semibold text-lg">
              {displayIfNullOrUndefined(age, 'Years')}
            </h4>
            <p className="text-sm text-gray-600">
              {displayIfNullOrUndefined(playerData?.date_of_birth)}
            </p>
          </div>
        </div>
        <div className="h-24 col-span-3 border-b border-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="font-semibold text-lg">
              {displayIfNullOrUndefined(playerData?.weight, 'Kg')}
            </h4>
            <p className="text-sm text-gray-600">Weight</p>
          </div>
        </div>
        <div className="h-24 col-span-3 border-t border-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="font-semibold text-lg">
              {displayIfNullOrUndefined(playerData?.latest[0]?.jersey_number)}
            </h4>
            <p className="text-sm text-gray-600">Shirt</p>
          </div>
        </div>
        <div className="h-24 col-span-4 sm:col-span-2 border-x border-t border-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="font-semibold text-lg">
              {displayIfNullOrUndefined(playerData?.country?.name)}
            </h4>
            <p className="text-sm text-gray-600">Country</p>
          </div>
        </div>
        <div className="h-24 col-span-3 border-t border-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="font-semibold text-lg">
              {displayIfNullOrUndefined(formattedAmount)}
            </h4>
            <p className="text-sm text-gray-600">Market Value</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-16">
        <div className="flex items-center gap-2">
          <img
            src={recentSeasonStats?.season?.league?.image_path}
            alt="team image"
            className="w-10 h-10 p-0.5 ring-1 ring-black rounded-full"
          />
          <h4>{recentSeasonStats?.season?.league?.name}</h4>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-10 mt-3">
          <div className="text-center font-semibold">
            <span>{playerStats?.APPEARANCES || '-'}</span>
            <h4>Matches</h4>
          </div>
          <div className="text-center font-semibold">
            <span>{playerStats?.GOALS_CONCEDED || '-'}</span>
            <h4>Goals</h4>
          </div>
          <div className="text-center font-semibold">
            <span>{playerStats?.ASSISTS || '-'}</span>
            <h4>Assists</h4>
          </div>
          <div className="text-center font-semibold bg-red-500 text-white">
            <span>{playerStats?.rating || '-'}</span>
            <h4>Rating</h4>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-500 mx-auto w-10/12 sm:w-8/12 mt-5 grid grid-cols-2 gap-5 pt-5">
        <div>
          <h4 className="text-xl font-semibold">Position</h4>
          <h4>{playerData?.position?.name}</h4>
        </div>
        <div className="relative">
          <img
            src="/images/football_field.png"
            alt="team image"
            className="p-0.5 w-full"
          />
          <div className="absolute inset-0 p-5">
            <div
              className={`flex items-center h-full gap-2 ${getPositionStyle(
                playerData?.position?.name
              )}`}
            >
              <img
                src={playerData?.image_path}
                alt="team image"
                className="w-8 h-8 p-0.5 ring-1 ring-secondary rounded-full"
              />
              <h4 className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                {getPositionLetter(playerData?.position?.name)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function formatMoney(amount) {
  if (amount >= 1e6) {
    return (amount / 1e6)?.toFixed(2) + 'M';
  } else if (amount >= 1e3) {
    return (amount / 1e3)?.toFixed(2) + 'K';
  } else {
    return amount?.toFixed(2);
  }
}

const getPositionStyle = (position) => {
  switch (position) {
    case 'Attacker':
      return 'justify-end';
    case 'Midfielder':
      return 'justify-center';
    case 'Defender':
    case 'Goalkeeper':
      return 'justify-start';
    default:
      return '';
  }
};

const getPositionLetter = (position) => {
  switch (position) {
    case 'Attacker':
      return 'F';
    case 'Midfielder':
      return 'M';
    case 'Defender':
      return 'D';
    case 'Goalkeeper':
      return 'G';
    default:
      return '';
  }
};
