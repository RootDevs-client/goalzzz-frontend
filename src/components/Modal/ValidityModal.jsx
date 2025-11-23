// 'use client';

// import { useAuthStore } from '@/lib/auth-store';
// import { xoomBackendUrl } from '@/lib/axios/getAxios';
// import { getSession, signIn } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { BiFootball } from 'react-icons/bi';

// export default function ValidityModal() {
//   const { token } = useAuthStore();

//   const [userId, setUserId] = useState('');
//   const [accessCode, setAccessCode] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === 'Escape') {
//         event.preventDefault();
//       }
//     };

//     document.addEventListener('keydown', handleEsc);

//     return () => {
//       document.removeEventListener('keydown', handleEsc);
//     };
//   }, []);

//   useEffect(() => {
//     if (token) {
//       document.getElementById('new-auth-modal').close();
//     } else if (token === null) {
//       document.getElementById('new-auth-modal').showModal();
//     }
//   }, [token]);

//   const refreshSession = async () => {
//     const newSession = await getSession();
//     if (newSession) {
//       document.getElementById('new-auth-modal').close();
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId || !accessCode) {
//       setError('Please fill in the required fields');
//       return;
//     }

//     setError('');
//     setIsLoading(true);
//     try {
//       const { data } = await xoomBackendUrl.post('/api/user-login', {
//         userId,
//         accessCode,
//       });

//       localStorage.setItem('accessCode', data.token);

//       await signIn('credentials', {
//         redirect: false,
//         token: data.token,
//         userId,
//         role: 'user',
//       });

//       await refreshSession();
//       document.getElementById('new-auth-modal').close();
//     } catch (error) {
//       console.error(error);
//       setError('Invalid access code');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <dialog id="new-auth-modal" className="modal backdrop-blur-sm">
//       <form className="modal-box" onSubmit={onSubmit}>
//         <div className="flex items-center text-2xl font-semibold uppercase md:text-3xl text-primary">
//           <span className="text-secondary">x</span>
//           <BiFootball className="animate-bounce" />
//           <BiFootball className="text-secondary animate-bounce [animation-delay:-0.3s]" />
//           mSp
//           <BiFootball className="animate-spin" />
//           rt
//         </div>
//         <p className="py-4">
//           Please, enter your access code to browse the website!
//         </p>

//         <div className="flex flex-col gap-3">
//           <label className="text-sm">User ID</label>
//           <input
//             type="text"
//             className="input input-bordered w-full"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />

//           <label className="text-sm">Access Code</label>
//           <input
//             type="text"
//             className="input input-bordered w-full"
//             value={accessCode}
//             onChange={(e) => setAccessCode(e.target.value)}
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm ml-1 mt-3">{error}</p>}

//         <div className="modal-action">
//           <button
//             type="submit"
//             className="btn-primary btn btn-sm"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Verifying...' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </dialog>
//   );
// }
