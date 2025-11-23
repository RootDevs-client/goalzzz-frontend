import MatchStates from '@/app/match/_components/MatchStates';
import moment from 'moment';
import Link from 'next/link';
import { BiSolidVideoRecording } from 'react-icons/bi';

export default function FixtureCard({
  match,
  offset,
  isCheckingHighlight,
  handleCheckHighlightModal,
}) {
  const finishedStatus = ['FT', 'AET', 'FT_PEN'];

  const isFinished = finishedStatus.includes(match?.state?.state);

  const formattedDate = moment
    .utc(match?.starting_at)
    .utcOffset(offset)
    .format('YYYY-MM-DD HH:mm');

  return (
    <div className="relative w-full">
      <div className={`w-full ${isCheckingHighlight && 'animate-pulse'}`}>
        <div className={`h-auto w-full mb-1`}>
          <div className={`p-2 grid grid-cols-12 items-center gap-2`}>
            <p className="col-span-1 text-gray-200 text-sm font-semibold badge bg-primary rounded-md">
              {match?.state?.short_name}
            </p>
            <div className="col-span-3 flex items-center">
              <img
                src={match?.participants[0]?.image_path}
                alt="team one"
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {match?.participants[0]?.name}
              </h4>
            </div>

            <MatchStates match={match} />
            <div className="col-span-3 flex items-center">
              <img
                src={match?.participants[1]?.image_path}
                alt="team two"
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {match?.participants[1]?.name}
              </h4>
            </div>

            <div className="col-span-2 w-full">
              {isFinished ? (
                <button
                  onClick={() => handleCheckHighlightModal(match)}
                  className="btn btn-sm rounded"
                  disabled={isCheckingHighlight}
                >
                  Add Highlights
                </button>
              ) : (
                <Link
                  href={`/xoomadmin/manage-live/create?fixture_id=${match?.id}&title=${match?.league?.name}&t1_name=${match?.participants[0]?.name}&t1_img=${match?.participants[0]?.image_path}&t2_name=${match?.participants[1]?.name}&t2_img=${match?.participants[1]?.image_path}&time=${formattedDate}`}
                  type="button"
                  className="btn btn-sm rounded"
                >
                  <BiSolidVideoRecording className="mr-2 text-xl" />
                  Add Live
                </Link>
                // <button className="btn btn-sm rounded">Add Match</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
