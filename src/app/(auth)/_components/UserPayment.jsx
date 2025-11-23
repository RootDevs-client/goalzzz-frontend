'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

export default function UserPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const { userInfo } = useAuthStore();

  const { isLoading, data } = useQuery(
    'all-subscriptions',
    async () => {
      const response = await xoomBackendUrl.get(`/api/subscriptions`);
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch all subscriptions data!');
      }
    },
    { enabled: !!userInfo }
  );

  const handlePayment = async () => {
    if (!selectedPlan) return toast.error('Please select a plan');

    setIsProcessing(true);
    try {
      if (paymentMethod === 'card') {
        const response = await xoomBackendUrl.post('/api/payment', {
          phone: userInfo?.phone,
          password: userInfo?.password,
          subscription: selectedPlan._id,
        });

        if (response.status === 200) {
          window.location.assign(response?.data?.data?.session);
        }
      } else if (paymentMethod === 'mobile') {
        window.location.assign(`${process.env.NEXT_PUBLIC_MOBILE_PAYMENT_URL}`);
      }
    } catch (error) {
      toast.error('Payment failed, please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-10 lg:mt-20 p-6 rounded-lg border border-primary shadow-lg bg-white">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Choose Your Package
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex items-start gap-5 justify-start flex-col">
          <img src="/images/default_profile.png" alt="" className="w-24" />
          <p>
            <span className="text-lg font-semibold text-gray-700">Phone:</span>{' '}
            {userInfo?.phone}
          </p>
        </div>

        <div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="bg-gray-300 h-7 rounded w-full mb-4"></div>
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="mb-4">
                  <div className="bg-gray-300 h-4 rounded w-full mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-1/2 mb-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
              <h4 className="text-xl font-bold mb-6">Subscription Plans</h4>

              {data?.map((plan) => (
                <div
                  key={plan?._id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`border ${
                    plan._id === selectedPlan?._id
                      ? 'border-secondary bg-red-100'
                      : 'border-primary'
                  } rounded-lg p-4 mb-4 cursor-pointer transition-all duration-200`}
                >
                  <label className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="plan"
                        checked={plan._id === selectedPlan?._id}
                        className={`form-radio mr-3 checkbox-md checkbox ${
                          plan._id === selectedPlan?._id && 'checkbox-error'
                        }`}
                      />
                      <span className="text-lg font-medium">{plan.title}</span>
                    </div>
                    <span className="text-gray-500 capitalize">
                      ${plan.price} / {plan.duration_type}
                    </span>
                  </label>
                </div>
              ))}

              <h4 className="text-base mb-6">Select Payment Methods</h4>

              <select
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select One</option>
                <option value="card">Visa/Mastercard</option>
                <option value="mobile">Mobile Payment</option>
              </select>

              <button
                className="btn btn-primary w-full mt-4"
                onClick={handlePayment}
                disabled={!selectedPlan || isProcessing || !paymentMethod}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
