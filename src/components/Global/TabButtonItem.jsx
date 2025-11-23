export default function TabButtonItem({ tab, onClick, active }) {
  const classNames = `uppercase cursor-pointer ${
    active ? 'text-white' : 'btn-outline'
  } btn btn-primary btn-sm rounded-md mx-2 mt-2`;

  return (
    <div onClick={onClick} className={classNames}>
      {tab}
    </div>
  );
}
