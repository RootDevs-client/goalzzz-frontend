import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StreamingLink from './StreamingLink';

export default function StreamingSortModal({ singleMatch }) {
  const [isSorting, setIsSorting] = useState(false);
  const [streamingSources, setStreamingSources] = useState([]);

  useEffect(() => {
    setStreamingSources(singleMatch?.streaming_sources);
  }, [singleMatch?.streaming_sources]);

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = streamingSources.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = streamingSources.findIndex(
        (item) => item.id === over.id
      );
      const newItems = arrayMove(streamingSources, activeIndex, overIndex);
      newItems.forEach((item, index) => {
        item.position = index + 1;
      });

      setStreamingSources(newItems);

      const sourceIdWithPosition = newItems.map((item) => {
        return { _id: item._id, position: item.position };
      });

      try {
        setIsSorting(true);
        const { data } = await xoomBackendUrl.post(
          '/api/admin/matches/streaming-sort',
          sourceIdWithPosition
        );
        if (data?.status) {
          setIsSorting(false);
          toast.success('Streaming Source Sorted Successfully!');
        }
      } catch (err) {
        setIsSorting(false);
        toast.error('Failed to sort!');
      } finally {
        setIsSorting(false);
      }
    }
  }

  return (
    <dialog id="sort_streaming_modal" className="modal">
      <div className="modal-box rounded-md">
        <div className="p-3">
          <div className="mb-3 grid grid-cols-12 items-center justify-between p-2">
            <div className="col-span-4 flex flex-col">
              <img
                src={singleMatch?.team_one_image}
                alt="Image"
                className="m-auto h-16 w-16 rounded-md border border-gray-200 object-contain p-1"
              />
              <p className="mt-1 text-center text-sm font-bold">
                {singleMatch?.team_one_name}
              </p>
            </div>

            <div className="col-span-4 ">
              <p className="text-md mb-1 text-center font-bold">
                {singleMatch?.match_title}
              </p>
              <p className="text-center text-sm text-gray-600">
                {moment(singleMatch?.time).format('MMMM Do YYYY')}
              </p>
              <p className="text-center text-sm text-gray-600">
                {moment(singleMatch?.time).format('h:mm A')}
              </p>
            </div>

            <div className="col-span-4 flex flex-col">
              <img
                src={singleMatch?.team_two_image}
                alt="Image"
                className="m-auto h-16 w-16 rounded-md border border-gray-200 object-contain p-1"
              />
              <p className="mt-1 text-center text-sm font-bold">
                {singleMatch?.team_two_name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ul className="w-full rounded-md">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                {streamingSources && (
                  <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={streamingSources}
                  >
                    {streamingSources?.length > 0 ? (
                      streamingSources
                        .sort((a, b) => a.position - b.position)
                        .map((source) => (
                          <StreamingLink
                            key={source.id}
                            source={source}
                            isSorting={isSorting}
                          />
                        ))
                    ) : (
                      <li className="mb-2 rounded-md border-2 border-violet-500 bg-white p-2">
                        <a>No Streaming Link Available!</a>
                      </li>
                    )}
                  </SortableContext>
                )}
              </DndContext>
            </ul>
          </div>
        </div>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none">
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
}
