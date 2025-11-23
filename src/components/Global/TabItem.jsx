export default function TabItem({ tab, onClick, active, isWhite }) {
  const classNames = `uppercase cursor-pointer ${active
    ? 'text-secondary font-medium'
    : isWhite
      ? 'text-black'
      : 'text-white'
    } hover:text-secondary transition-all ease-in duration-150 min-w-max`;

  return (
    <div onClick={onClick} className={classNames}>
      {tab}
    </div>
  );
}
