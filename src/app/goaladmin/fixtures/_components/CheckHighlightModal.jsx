import Link from 'next/link';

export default function CheckHighlightModal({ highlightInfo }) {
  const { matchInfo, highlights } = highlightInfo;

  if (!matchInfo || !highlights) {
    // Handle the case where matchInfo or highlights are undefined
    return (
      <dialog id="check_highlight_modal" className="modal">
        <div className="modal-box rounded-md bg-white">
          <h3 className="font-bold text-lg">Error</h3>
          <p className="py-4">
            Something went wrong. Unable to fetch highlight information.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }

  const { participants, league } = matchInfo;
  return (
    <dialog id="check_highlight_modal" className="modal">
      <div className="modal-box rounded-md bg-white">
        <h3 className="font-bold text-lg">Highlights</h3>
        <p className="py-4">
          {highlights.length === 0 && <>No highlight available</>}
        </p>
        <div>
          {highlights.map((highlight, index) => (
            <div key={index}>
              <p className="text-sm bg-base-100 px-2 py-.5 rounded-md w-fit mb-2">
                {highlight?.location}
              </p>
            </div>
          ))}
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Link
            href={`/xoomadmin/highlights/create?title=${
              participants[0]?.name
            } vs ${participants[1]?.name}&league=${
              league?.name || ''
            }&fixture_id=${matchInfo.id}&video_list=${JSON.stringify(
              highlights.map((highlight) => highlight.location)
            )}`}
            type="button"
            className="btn btn-success btn-sm rounded-md"
          >
            Create Highlight
          </Link>
        </div>
      </div>
    </dialog>
  );
}
