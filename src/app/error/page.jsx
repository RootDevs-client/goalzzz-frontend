export default function page({ searchParams }) {
  const { message } = searchParams;
  return (
    <div className="max-w-screen-md mx-auto">
      <h4 className="text-center text-lg font-semibold p-5">{message}</h4>

      <div className="divider">or</div>

      <p className="text-center text-lg text-gray-700 py-4">
        Register on Xoomsport
      </p>

      <div className="flex items-center justify-center  gap-5">
        <button className="btn btn-accent btn-outline btn-sm rounded-md">
          Login
        </button>
        <button className="btn btn-accent btn-sm rounded-md">Register</button>
      </div>
    </div>
  );
}
