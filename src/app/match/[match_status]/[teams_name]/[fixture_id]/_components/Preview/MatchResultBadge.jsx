// MatchResultBadge.jsx

const MatchResultBadge = ({ result }) => {
  let colorClass, text;

  switch (result) {
    case 'win':
      colorClass = 'bg-green-600 text-white';
      text = 'W';
      break;
    case 'lose':
      colorClass = 'bg-red-600 text-white';
      text = 'L';
      break;
    default:
      colorClass = 'bg-gray-100 text-black';
      text = 'D';
      break;
  }

  return (
    <span
      className={`w-6 h-6 xs:w-7 xs:h-7 rounded-full p-1 flex items-center justify-center ring-1  ring-black font-semibold ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default MatchResultBadge;
