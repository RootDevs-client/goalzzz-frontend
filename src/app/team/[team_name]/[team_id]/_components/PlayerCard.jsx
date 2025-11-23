import getSlugify from '@/lib/helpers/getSlugify';
import Link from 'next/link';

export default function PlayerCard({ player }) {
  return (
    <Link
      href={`/player/${getSlugify(player?.displayName)}/${player.playerId}`}
      className="flex items-center gap-2 my-2"
    >
      <img
        src={player?.imagePath}
        alt={player?.displayName}
        width={50}
        height={50}
        className="w-10 h-10 ring-1 ring-black p-0.5 rounded-full"
      />
      <div>
        <h4 className="text-sm font-semibold mb-1">{player?.displayName}</h4>
        <div className="flex items-center gap-1">
          <img
            src={player?.countryImagePath}
            alt={player?.countryName}
            className="h-5 w-8"
          />
          <p className="text-xs">{player?.countryName}</p>
        </div>
      </div>
    </Link>
  );
}
