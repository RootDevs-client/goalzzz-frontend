import SignInForm from './_components/SignInForm';

export const metadata = {
  title: 'Goalzzz | Admin Login',
};

export default async function Page() {
  return (
    <section className="grid min-h-screen items-center justify-items-center bg-gradient-to-r from-slate-900 to-slate-700 p-5">
      <div className="card w-10/12 md:w-6/12 lg:w-4/12 bg-base-100 shadow-xl lg:card-side !flex-col">
        <figure className="w-1/2 m-auto">
          <img
            src="/images/xslogo.webp"
            alt="Logo"
            className="w-full"
            priority={true}
          />
        </figure>
        <div className="card-body">
          <h2 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
            Admin Login
          </h2>
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
