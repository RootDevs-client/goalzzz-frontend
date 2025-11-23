import getCapitalizeEachWord from '@/lib/helpers/getCapitalizeEachWord';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator } from 'react-icons/md';

function StreamingLink({ source, isSorting }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: source.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li
      ref={setNodeRef}
      style={style}
      key={source.id}
      className={`mb-3 flex items-center justify-between rounded-md border-2 border-violet-300 bg-white p-2 ${
        isSorting && 'animate-pulse'
      }`}
    >
      <div>
        <p className="font-bold">
          Stream Title:{' '}
          <span className="text-sm font-medium">{source.stream_title}</span>
        </p>
        <p className="font-bold overflow-hidden">
          Link:{' '}
          {source.stream_type !== 'root_stream' && (
            <span className="font-medium text-sm">
              {source.stream_url.length > 40
                ? source.stream_url.slice(0, 40) + '...'
                : source.stream_url}
            </span>
          )}
          {source.stream_type === 'root_stream' &&
            source.root_streams.map((link, index) => {
              return (
                <span className="block font-medium" key={index}>
                  {link.root_stream_stream_url.length > 40
                    ? link.root_stream_stream_url.slice(0, 40) + '...'
                    : link.root_stream_stream_url}
                </span>
              );
            })}
        </p>

        <p className="font-bold">
          <span className="badge badge-primary mr-3 font-medium">
            {getCapitalizeEachWord(source.stream_type.replace('_', ' '))}
          </span>
          {source?.stream_status == '1' ? (
            <span className="badge bg-green-400">Active</span>
          ) : (
            <span className="badge bg-red-400">Inactive</span>
          )}
        </p>
      </div>
      <div className="tooltip" data-tip="Drag">
        <MdDragIndicator
          className="cursor-grab text-xl outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
    </li>
  );
}

export default StreamingLink;
