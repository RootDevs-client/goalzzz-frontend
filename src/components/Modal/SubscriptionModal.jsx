'use client';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import { IoCheckmarkDone } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function SubscriptionModal() {
  const [subPackage, setSubPackage] = useState('monthly');
  const [subscriptionData, setSubscriptionData] = useState([]);

  useEffect(() => {
    async function getAllSubscription() {
      const { data } = await xoomBackendUrl.get(`/api/subscriptions`);
      setSubscriptionData(data);
    }
    getAllSubscription();
  }, []);

  const monthlyData = Array.isArray(subscriptionData?.data)
    ? subscriptionData.data.find(
        ({ duration_type }) => duration_type === 'monthly'
      )
    : null;

  const yearlyData = Array.isArray(subscriptionData?.data)
    ? subscriptionData.data.find(
        ({ duration_type }) => duration_type === 'yearly'
      )
    : null;

  const lifeTimeData = Array.isArray(subscriptionData?.data)
    ? subscriptionData.data.find(
        ({ duration_type }) => duration_type === 'lifetime'
      )
    : null;
  return (
    <dialog className="modal" id="subscriptionModal">
      <div className="modal-box rounded-none -skew-y-[1deg] p-0 w-11/12 max-w-3xl h-fit bg-black relative ">
        <div className="bg-[#FB0405] w-28 font-bold text-white mx-9 z-30 absolute left-5">
          <h2 className="py-1 px-4 font-semibold text-white skew-y-[1deg]">
            PREMIUM
          </h2>
        </div>
        <form method="dialog">
          <button className="absolute cursor-pointer right-2 top-2 outline-none z-10">
            <RxCross2 className="text-xl text-secondary" />
          </button>
        </form>
        <div className="w-full text-white">
          <div className="">
            <div className="p-8 skew-y-[1deg] flex items-center justify-center">
              <div>
                <h2 className="font-bold mb-6">
                  GET LIFETIME OF PREMIUM FOR ${lifeTimeData?.price}
                </h2>
                <p className="text-gray-200">
                  Individual Plan Only.$0.99/ per month after. Terms and
                  Condition Apply.Open only to users who haven`&apos;`t tried
                  Premium
                </p>
              </div>
              <div>
                <div className="bg-[#FB0405] w-28 h-28 rounded-full text-center flex items-center justify-center">
                  <div>
                    <h2>Get</h2>
                    <h2>{lifeTimeData?.title.toUpperCase()}</h2>
                    <h2 className="">${lifeTimeData?.price}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PerfectScrollbar>
            <div className="bg-white text-black border border-green-600">
              <div className="skew-y-[1deg]">
                <h2 className="font-semibold text-sm mx-4 pt-3">
                  PICK YOUR PLAN
                </h2>
                <div className="py-3 grid justify-items-center">
                  <div>
                    <div className="flex items-center relative mx-auto">
                      <div
                        onClick={() => setSubPackage('monthly')}
                        className={
                          subPackage === 'monthly'
                            ? ' bg-[#FB0405] -skew-y-[1deg] text-xl  sticky z-10 text-center text-white w-36 h-36 flex items-center justify-center transition duration-300 ease-in-out '
                            : 'bg-black text-center -mb-1 -ms-[1rem] text-md  -skew-y-[1deg] text-white w-32 h-32 flex items-center justify-center transition duration-300 ease-in-out'
                        }
                      >
                        <div className=" text-semibold skew-y-[1deg]">
                          <p>{monthlyData?.title.toUpperCase()}</p>
                          <p className="font-bold">${monthlyData?.price}</p>
                          <p>(SAVE 16%)</p>
                        </div>
                      </div>
                      <div
                        onClick={() => setSubPackage('yearly')}
                        className={
                          subPackage === 'yearly'
                            ? ' bg-[#FB0405] -skew-y-[1deg] sticky z-10 text-center text-white w-36 h-36 flex items-center justify-center transition duration-300 ease-in-out'
                            : 'bg-black text-center   -ms-[1rem] -skew-y-[1deg] text-white w-32 h-32 flex items-center justify-center transition duration-300 ease-in-out'
                        }
                      >
                        <div className=" text-semibold text-xl skew-y-[1deg]">
                          <p>{yearlyData?.title.toUpperCase()}</p>
                          <p className="font-bold">${yearlyData?.price}</p>
                        </div>
                      </div>
                      <div
                        onClick={() => setSubPackage('lifetime')}
                        className={
                          subPackage === 'lifetime'
                            ? ' bg-[#FB0405] -skew-y-[1deg] sticky z-10 text-center text-white  w-36 h-36 flex items-center justify-center transition duration-300 ease-in-out'
                            : 'bg-black text-center mb-1 -skew-y-[1deg] text-white w-32 h-32 flex items-center justify-center transition duration-300 ease-in-out'
                        }
                      >
                        <div className=" text-semibold text-xl skew-y-[1deg]">
                          <p>{lifeTimeData?.title.toUpperCase()}</p>
                          <p className="font-bold">${lifeTimeData?.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="divider m-0  bg-white skew-y-[1deg]">
                <div className=" bg-[#FB0405] py-2 text-white ">
                  <span className="p-5">CONTINUE</span>
                </div>
              </div>
              <br />
              {/* description  */}
              <div className="bg-white py-3">
                <div className=" mx-4 py-5 skew-y-[1deg]">
                  <h2 className="font-bold">WHY JOIN XOOMSPORT PREMIUM?</h2>
                  <div className="flex justify-around items-center py-5">
                    <div>
                      {subPackage === 'monthly' && (
                        <>
                          {monthlyData?.descriptions.map((des, index) => (
                            <div key={index} className="py-1 flex gap-2">
                              <div>
                                <IoCheckmarkDone className="text-[#FB0405] inline-block align-text-bottom mr-2" />
                              </div>
                              <div>
                                <span>{des}</span>
                              </div>
                            </div>
                          ))}{' '}
                        </>
                      )}
                      {subPackage === 'yearly' && (
                        <>
                          {yearlyData?.descriptions.map((des, index) => (
                            <div key={index} className="py-1 flex gap-2">
                              <div>
                                <IoCheckmarkDone className="text-[#FB0405] inline-block align-text-bottom mr-2" />
                              </div>
                              <div>
                                <span>{des}</span>
                              </div>
                            </div>
                          ))}{' '}
                        </>
                      )}
                      {subPackage === 'lifetime' && (
                        <div>
                          {lifeTimeData?.descriptions.map((des, index) => (
                            <div key={index} className="py-1 flex gap-2">
                              <div>
                                <IoCheckmarkDone className="text-[#FB0405] inline-block align-text-bottom mr-2" />
                              </div>
                              <div>
                                <span>{des}</span>
                              </div>
                            </div>
                          ))}{' '}
                        </div>
                      )}
                    </div>
                    <div>
                      <img
                        src="/images/football_player.png"
                        alt="News Image"
                        className="w-48 h-44"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </dialog>
  );
}
