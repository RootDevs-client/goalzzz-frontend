import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import SignIn from '../Global/SignIn';
import SignUp from '../Global/SignUp';

export default function AuthModal() {
  const [openTab, setOpenTab] = useState('sign-in');

  return (
    <dialog className="modal" id="authModal">
      <div className="modal-box rounded-none -skew-y-[1deg] p-0 w-full sm:w-[400px] h-fit overflow-y-hidden bg-white ">
        <form method="dialog">
          <button className="absolute cursor-pointer right-2 top-2 outline-none">
            <RxCross2 className="text-xl text-secondary" />
          </button>
        </form>

        <div className="flex gap-2 absolute top-0 right-14">
          <button
            onClick={() => setOpenTab('sign-in')}
            className={`${openTab === 'sign-in'
                ? 'bg-secondary text-gray-200'
                : 'bg-primary text-gray-200'
              }  p-1 w-20 text-center`}
          >
            Sign In
          </button>
          <button
            onClick={() => setOpenTab('sign-up')}
            className={`${openTab === 'sign-up'
                ? 'bg-secondary text-gray-200'
                : 'bg-primary text-gray-200'
              }  p-1 w-20 text-center`}
          >
            Sign Up
          </button>
        </div>
        <div className="skew-y-[1deg] mt-12 p-4">
          <AnimatePresence mode="wait">
            {openTab === 'sign-in' ? (
              <motion.div
                key="sign-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SignIn />
              </motion.div>
            ) : (
              <motion.div
                key="sign-up"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SignUp setOpenTab={setOpenTab} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </dialog>
  );
}
