import UserLogin from '@/app/(auth)/_components/UserLogin';

export default function page() {
  return (
    <div className="max-w-screen-lg mx-auto px-2">
      <div className="flex items-center justify-center mt-10">
        <h4 className="border border-green-300 rounded-lg px-5 py-2 shadow-green-200 text-base font-semibold">
          Your payment has been successful, Please login.
        </h4>
      </div>

      <UserLogin />
    </div>
  );
}
