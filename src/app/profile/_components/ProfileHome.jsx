'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

export default function ProfileHome() {
  const { token, user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const { push } = useRouter();

  const {
    isLoading,
    data: subscriptions,
    refetch,
  } = useQuery(
    'all-subscriptions',
    async () => {
      try {
        const response = await xoomBackendUrl.get('/api/subscriptions');
        return response.status === 200 ? response.data?.data : [];
      } catch (error) {
        toast.error('Failed to fetch subscriptions data.');
        throw new Error('Failed to fetch subscriptions data!');
      }
    },
    { enabled: !!user }
  );

  const handleCancelPayment = async () => {
    if (!token) {
      toast.error('You must be logged in to cancel a payment.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await xoomBackendUrl.post(
        '/api/payment/cancel',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        useAuthStore.getState().logout();
        push('/login');
        refetch();
        toast.success('Subscription cancelled successfully.');
      }
    } catch (error) {
      toast.error('Payment cancellation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 border border-gray-300 rounded-lg p-4 lg:p-6">
      {/* Profile Section */}
      <div className=" bg-white shadow-md rounded-xl p-6 flex flex-col items-center gap-4">
        {/* Profile Image */}
        <div className="relative w-28 h-28">
          <img
            src="/images/default_profile.png"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-primary object-cover"
          />
          {/* Optional: Online indicator */}
          <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {/* User Info */}
        <div className="w-full text-center space-y-2">
          <p className="text-lg font-medium text-gray-800">
            <span className="font-semibold">Phone:</span> {user?.phone || 'N/A'}
          </p>
          <p className="text-lg font-medium text-gray-800">
            <span className="font-semibold">Subscribed At:</span>{' '}
            {user?.SubscribedAt ? formatted(user?.SubscribedAt) : 'N/A'}
          </p>
          <p className="text-lg font-medium text-gray-800">
            <span className="font-semibold">Expires At:</span>{' '}
            {user?.expiresAt ? formatted(user.expiresAt * 1000) : 'N/A'}
          </p>
        </div>

        {/* Action Button */}
        <button
          className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors duration-200 
            ${
              isProcessing
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }
          `}
          onClick={handleCancelPayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Unsubscribe'}
        </button>
      </div>

      {/* Subscription Section */}
      <div className="p-6 max-w-md w-full mx-auto bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Active Subscription
        </h2>

        {user?.reference ? (
          <div className="border-2 border-red-500 bg-red-50 rounded-lg p-4 mb-4 transition-all duration-200">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  checked
                  className="form-radio checkbox-md checkbox-error"
                  readOnly
                />
                <span className="text-lg font-semibold text-red-600">
                  {user?.membershipPlan}
                </span>
              </div>
              <span className="text-sm text-red-700 font-medium">Active</span>
            </label>
          </div>
        ) : isLoading ? (
          <p className="text-gray-500 text-center">Loading subscriptions...</p>
        ) : subscriptions?.length > 0 ? (
          <div className="space-y-3">
            {subscriptions.map((plan) => {
              if (plan._id === user?.subscription) {
                return (
                  <div
                    key={plan._id}
                    className={`border rounded-lg p-4 flex justify-between items-center transition-all duration-200 cursor-pointer hover:shadow-lg 
                     
                    `}
                  >
                    <label className="flex items-center gap-3 w-full">
                      {/* <input
                        type="radio"
                        name="plan"
                        checked={plan._id === user?.subscription}
                        className="form-radio checkbox-md checkbox-error"
                        readOnly
                      /> */}
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-800">
                          {plan.title}
                        </span>
                        {/* <span className="text-sm text-gray-500">
                          ${plan.price} / {plan.duration_type}
                        </span> */}
                      </div>
                    </label>
                  </div>
                );
              }
            })}

        
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No active subscriptions found.
          </p>
        )}
            <div className="text-sm text-gray-600 mt-2">
              Goalzzz{' '}
              <span className="font-bold text-red-500 capitalize">
                daily pack
              </span>{' '}
              BDT 5.05/day (Tax included and auto-renewal applicable)
            </div>
      </div>
    </div>
  );
}

function formatted(timestamp) {
  const localDate = new Date(Number(timestamp));

  const date = localDate.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: true,
  });

  return date;
}
