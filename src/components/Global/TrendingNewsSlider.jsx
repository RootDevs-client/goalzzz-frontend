'use client';

import useGetAllNews from '@/lib/hooks/useGetAllNews';
import moment from 'moment';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function TrendingNewsSlider() {
  const { allNews, allNewsLoading } = useGetAllNews();

  if (allNewsLoading) {
    return (
      <div className="space-y-4 mt-2 mb-2">
        <div className="grid grid-cols-12">
          <div className="col-span-12 h-36 w-full bg-white animate-pulse rounded-md"></div>
          <div className="mt-2 col-span-6 h-3 w-full bg-white animate-pulse rounded-md"></div>
          <div className="mt-2 col-span-12 h-3 w-full bg-white animate-pulse rounded-md"></div>
          <div className="mt-2 col-span-3 h-3 w-full bg-white animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (!allNews || allNews.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        <p>
          No Trending news found.
          <br />{' '}
          <span className="text-sm text-gray-500 pt-4">
            Stay tuned for exiting news and updates!
          </span>{' '}
        </p>
      </div>
    );
  }

  return (
    <Slider {...sliderSettings}>
      {allNews.slice(0, 5).map((news) => (
        <Link key={news?._id} href={`/news/${news?.slug}`}>
          <NewsSlide key={news.id} news={news} />
        </Link>
      ))}
    </Slider>
  );
}

function NewsSlide({ news }) {
  return (
    <div>
      <img
        src={news?.image}
        alt={news?.title}
        className="w-72 h-44 mb-4 rounded-lg"
      />
      <p className="text-gray-600 text-sm">{news?.title.slice(0, 60)}</p>
      <h4 className="text-gray-700 text-sm font-medium mt-3 mb-3">
        Goalzzz
        <span className="text-xs ml-2">
          {formatNewsTimestamp(news?.publish_date)}
        </span>
      </h4>
    </div>
  );
}

function formatNewsTimestamp(timestamp) {
  const momentTimestamp = moment(timestamp);
  if (momentTimestamp.isValid()) {
    return momentTimestamp.fromNow();
  }
  return 'Invalid Date';
}
