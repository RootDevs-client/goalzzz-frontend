import moment from 'moment';

export default function PlayerTransfers({ transfers }) {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      {transfers?.map((transfer) => (
        <div className="bg-gray-200" key={transfer?.id}>
          <div className="skew-y-[0.5deg] flex items-center gap-3 p-2">
            <img
              src={transfer?.toteam?.image_path}
              alt="team image"
              className="w-10 h-10 p-0.5 ring-1 ring-black rounded-full"
            />
            <div className="">
              <h4 className="font-medium">{transfer?.toteam?.name}</h4>
              <p className="text-xs">
                <span>Fee: {formatMoney(transfer?.toteam?.amount)},</span>
                <span>
                  {moment(transfer?.toteam?.last_played_at).format(
                    'dddd D MMM YYYY'
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatMoney(amount) {
  if (amount === null || amount === undefined) {
    return '-';
  }
  if (amount >= 1e6) {
    return (amount / 1e6)?.toFixed(2) + 'M';
  } else if (amount >= 1e3) {
    return (amount / 1e3)?.toFixed(2) + 'K';
  } else {
    return amount?.toFixed(2);
  }
}
