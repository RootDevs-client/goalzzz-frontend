'use client';

import Link from 'next/link';
import HighlightsList from './HighlightsList';

export default function HighlightsHome() {
  const deleteAllHighlightModalHandler = () => {
    document.getElementById('highlightDeleteAllModal').showModal();
  };

  return (
    <div>
      <div className="flex gap-x-2 items-center justify-end">
        <Link
          href="/xoomadmin/highlights/create"
          className="btn btn-accent btn-sm btn-outline rounded-md"
        >
          Create Highlight
        </Link>
        <button
          onClick={deleteAllHighlightModalHandler}
          className="btn btn-error btn-outline btn-sm rounded-md"
        >
          Delete All Highlight
        </button>
      </div>
      <HighlightsList  />
    </div>
  );
}
