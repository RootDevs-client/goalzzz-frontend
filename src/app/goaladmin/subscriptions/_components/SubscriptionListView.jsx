import Link from 'next/link';
import { ImBin } from 'react-icons/im';
import { MdEditNote } from 'react-icons/md';

export default function SubscriptionListView({
  subscription,
  deleteSubscriptionModalHandler,
}) {
  return (
    <div className="grid grid-cols-12 items-center bg-gray-100 rounded-md gap-x-5 p-2">
      <div className="col-span-4">
        <p className="font-medium text-base"> {subscription.title}</p>
      </div>
      <div className="col-span-3 capitalize">
        <p>Type: {subscription.duration_type}</p>
        <p className="text-sm">Duration: {subscription.duration}</p>
      </div>

      <div className="col-span-1 capitalize">
        <p>Price: ${subscription.price}</p>
      </div>

      <div className="col-span-1 justify-self-center">
        {subscription.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>
      <div className="col-span-3 justify-self-end">
        <Link
          className="btn btn-sm btn-info"
          href={`/xoomadmin/subscriptions/update/${subscription._id}`}
        >
          <MdEditNote className="text-xl" />
        </Link>{' '}
        <button
          className="btn btn-sm btn-error"
          onClick={() => deleteSubscriptionModalHandler(subscription)}
        >
          <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
