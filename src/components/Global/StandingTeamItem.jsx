import getSlugify from '@/lib/helpers/getSlugify';
import nameFirstLetter from '@/lib/helpers/nameFirstLetter';
import Link from 'next/link';

export default function StandingTeamItem({ singleStandings }) {
  return (
    <>
      <div
        key={singleStandings.teamName}
        className="grid grid-cols-12 items-center w-full mt-3"
      >
        <div className="text-center font-semibold">
          {singleStandings?.position}
        </div>
        <div className="col-span-3 ">
          <div>
            <Link
              href={`/team/${getSlugify(singleStandings.teamName)}/${
                singleStandings?.teamId
              }`}
              className="flex items-center w-20 sm:w-auto"
            >
              <img
                src={singleStandings?.teamImage}
                alt={singleStandings?.teamName}
                className="w-7 h-7 ring-1 ring-primary mr-1 sm:mr-4 rounded-full"
              />
              <p className="text-black font-semibold uppercase whitespace-normal break-all">
                {nameFirstLetter(singleStandings?.teamName)}
              </p>
            </Link>
          </div>
        </div>
        <div className="text-end font-semibold">{singleStandings.GP}</div>
        <div className="text-end font-semibold">{singleStandings.W}</div>
        <div className="text-end font-semibold">{singleStandings.D}</div>
        <div className="text-end font-semibold">{singleStandings.L}</div>
        <div className="text-end font-semibold">{singleStandings.GF}</div>
        <div className="text-end font-semibold">{singleStandings.GA}</div>
        <div className="text-end font-semibold">{singleStandings.GD}</div>
        <div className="text-center font-semibold">{singleStandings.PTS}</div>
      </div>
    </>
  );
}
