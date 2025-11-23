import getSlugify from '@/lib/helpers/getSlugify';
import Link from 'next/link';

export default function PlayerView({ player }) {
  return (
    <Link
      href={`/player/${getSlugify(player?.name)}/${player.id}`}
      className="flex flex-col items-center justify-center gap-1 text-xs"
    >
      <img
        src={player?.image}
        alt="goal keeper image"
        className="w-7 h-7 rounded-full ring-1 p-0.5 ring-white "
      />
      <h4 className="font-semibold">
        <span>{player?.jersey}</span>
        <span>{player?.name}</span>
      </h4>
    </Link>
  );
}
