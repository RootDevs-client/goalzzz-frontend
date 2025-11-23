'use client';
import DOMPurify from 'dompurify';

export default function SingleNewsDetails({ newsData }) {
  const sanitizedDescription = DOMPurify.sanitize(newsData?.description || '');

  return (
    <div className="sm:max-w-screen-md md:max-w-screen-md lg:max-w-screen-lg mx-auto mt-6">
      <div className="card rounded-none">
        <div className="bg-black -skew-y-[0.5deg]">
          <figure>
            <img
              src={newsData?.image}
              alt="HighlightImg"
              className="w-full h-full skew-y-[0.5deg] py-[4px] aspect-[16/8] object-cover"
            />
          </figure>
        </div>
        <div>
          <h2 className="text-xl font-bold px-5 sm:px-0 my-4">
            {newsData?.title}
          </h2>
          <div
            className="px-5 sm:px-0"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </div>
      </div>
    </div>
  );
}
