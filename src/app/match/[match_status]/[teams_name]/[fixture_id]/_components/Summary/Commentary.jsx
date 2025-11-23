import NoDataFound from '@/components/Global/NoDataFound';

export default function Commentary({ comments }) {
  return (
    <div className="mt-10 skew-y-[1deg]">
      {comments.length === 0 && (
        <>
          <NoDataFound />
        </>
      )}
      {comments
        .sort((a, b) => b.order - a.order)
        .map((comment) => (
          <div key={comment.id} className="bg-base-100 p-2 mt-3 flex">
            <div className="text-base">
              {comment?.minute !== null && (
                <div className="border-r border-primary w-20 mx-2 px-2 text-center">
                  <span>
                    {comment?.minute}
                    {comment?.extra_minute
                      ? `+ ${comment?.extra_minute}`
                      : null}
                    {"' "}
                  </span>
                </div>
              )}
            </div>
            <p className=" max-w-[1000px] ms-4">{comment?.comment}</p>
          </div>
        ))}
    </div>
  );
}
