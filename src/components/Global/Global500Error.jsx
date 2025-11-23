import Link from 'next/link';

export default function Global500Error() {
  return (
    <div className="flex items-center justify-center">
      <div className="sm:w-1/2 mt-24 sm:mt-44 p-5">
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-semibold">No Data Found !!</h1>
          <p className="mt-8 mb-8 font-semibold">
            Oops, looks like the data you are looking for does not exist.
          </p>
          <small>
            <p>
              The data you are trying to receive may be incorrect, or the data
              may have been removed. Please explore other exciting sections of
              our football web app. Visit our <Link href="/">home page</Link> to
              discover the latest football news, scores, and more!
            </p>
          </small>
        </div>
      </div>
    </div>
  );
}
