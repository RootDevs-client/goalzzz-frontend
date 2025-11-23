import getSlugify from '@/lib/helpers/getSlugify';
import Link from 'next/link';

export default function LeagueItem({ league }) {
  return (
    <div>
      <Link
        href={`/league/${getSlugify(league?.name)}/${league?.id}`}
        className="flex items-center mb-4"
      >
        <img
          src={league?.image_path}
          alt={league?.name}
          className="w-7 h-7 ring-1 ring-primary mr-4 rounded-full"
        />
        <p className="text-black font-medium uppercase">{league?.name}</p>
      </Link>
    </div>
  );
}
