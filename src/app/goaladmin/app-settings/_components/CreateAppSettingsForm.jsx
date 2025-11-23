'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetAppSettings from '@/lib/hooks/useGetAppSettings';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

export default function CreateAppSettingsForm() {
  const validationSchema = Yup.object().shape({
    jw_player: Yup.object().shape({
      player_id: Yup.string().required('Player ID is required'),
      player_logo: Yup.string().required('Player Logo is required'),
    }),
    popup: Yup.object().shape({
      guest_popup_time: Yup.number()
        .oneOf([10, 20, 30, 60, 90, 120])
        .required('Guest Popup Time is required'),
      guest_popup_duration: Yup.number()
        .oneOf([1, 2, 3, 4, 5])
        .required('Guest Popup Duration is required'),
      login_popup_time: Yup.number()
        .oneOf([10, 20, 30, 60, 90, 120])
        .required('Login Popup Time is required'),
      login_popup_duration: Yup.number()
        .oneOf([1, 2, 3, 4, 5])
        .required('Login Popup Duration is required'),
    }),
  });

  const initialValues = {
    jw_player: {
      player_id: '',
      player_logo: '',
    },
    popup: {
      guest_popup_time: 10,
      guest_popup_duration: 3,
      login_popup_time: 10,
      login_popup_duration: 3,
    },
  };

  const { appSettings, isLoadingAppSettings, refetchAppSettings } =
    useGetAppSettings();

  if (isLoadingAppSettings) {
    return <GlobalLoading />;
  }

  const onSubmit = async (values) => {
    try {
      const { data } = await xoomBackendUrl.post(
        '/api/admin/app-settings',
        values
      );

      if (data.status) {
        refetchAppSettings();
        toast.success('App settings submitted');
      }
    } catch (error) {
      toast.error('Failed to submit app settings, please try again!');
      console.error('Error creating Live Matches:', error);
    }
  };
  return (
    <div className="mt-10 bg-white p-2 rounded-lg">
      <Formik
        initialValues={appSettings?.data || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <div className="rounded-md bg-white p-4 border border-gray-300 mt-3">
              <h4 className="text-lg text-gray-700 font-medium capitalize">
                JW Player
              </h4>
              <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="form-group">
                  <label
                    className="block text-gray-700 font-medium text-sm mb-2"
                    htmlFor="jw_player.player_id"
                  >
                    Player ID
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="jw_player.player_id"
                    name="jw_player.player_id"
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="jw_player.player_id"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="jw_player.player_logo"
                    className="block text-gray-700 font-medium text-sm mb-2"
                  >
                    Player Logo
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="jw_player.player_logo"
                    name="jw_player.player_logo"
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="jw_player.player_logo"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-md bg-white p-4 border border-gray-300 mt-3">
              <h4 className="text-lg text-gray-700 font-medium capitalize">
                Pop Up Settings
              </h4>
              <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="form-group">
                  <label
                    className="block text-gray-700 font-medium text-sm mb-2"
                    htmlFor="popup.guest_popup_time"
                  >
                    Guest Popup Time
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="popup.guest_popup_time"
                    name="popup.guest_popup_time"
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                  >
                    <option value={10}>10 seconds</option>
                    <option value={20}>20 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>60 seconds</option>
                    <option value={90}>90 seconds</option>
                    <option value={120}>120 seconds</option>
                  </Field>
                  <ErrorMessage
                    name="popup.guest_popup_time"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div className="form-group">
                  <label
                    className="block text-gray-700 font-medium text-sm mb-2"
                    htmlFor="popup.guest_popup_duration"
                  >
                    Guest Popup Duration
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="popup.guest_popup_duration"
                    name="popup.guest_popup_duration"
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                  >
                    <option value={1}>1 second</option>
                    <option value={2}>2 seconds</option>
                    <option value={3}>3 seconds</option>
                    <option value={4}>4 seconds</option>
                    <option value={5}>5 seconds</option>
                  </Field>
                  <ErrorMessage
                    name="popup.guest_popup_duration"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="bg-gray-200 rounded-full w-fit py-0.5 px-2 mt-2 text-sm shadow-md shadow-gray-300">
                Guest user will get{' '}
                <span className="text-orange-500">
                  {Math.round(
                    ((parseInt(values.popup.guest_popup_time) +
                      parseInt(values.popup.guest_popup_duration)) *
                      5) /
                      60
                  )}{' '}
                  minutes{' '}
                </span>
                of free watch time.
              </div>

              <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="form-group">
                  <label
                    className="block text-gray-700 font-medium text-sm mb-2"
                    htmlFor="popup.login_popup_time"
                  >
                    Login Popup Time
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="popup.login_popup_time"
                    name="popup.login_popup_time"
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                  >
                    <option value={10}>10 seconds</option>
                    <option value={20}>20 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>60 seconds</option>
                    <option value={90}>90 seconds</option>
                    <option value={120}>120 seconds</option>
                  </Field>
                  <ErrorMessage
                    name="popup.login_popup_time"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div className="form-group">
                  <label
                    className="block text-gray-700 font-medium text-sm mb-2"
                    htmlFor="popup.login_popup_duration"
                  >
                    Login Popup Duration
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="popup.login_popup_duration"
                    name="popup.login_popup_duration"
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                  >
                    <option value={1}>1 second</option>
                    <option value={2}>2 seconds</option>
                    <option value={3}>3 seconds</option>
                    <option value={4}>4 seconds</option>
                    <option value={5}>5 seconds</option>
                  </Field>
                  <ErrorMessage
                    name="popup.login_popup_duration"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="bg-gray-200 rounded-full w-fit py-0.5 px-2 mt-2 text-sm shadow-md shadow-gray-300">
                Login user will get{' '}
                <span className="text-orange-500">
                  {Math.round(
                    ((parseInt(values.popup.login_popup_time) +
                      parseInt(values.popup.login_popup_duration)) *
                      5) /
                      60
                  )}{' '}
                  minutes{' '}
                </span>
                of free watch time.
              </div>
            </div>

            <div className="flex items-center justify-end py-3">
              <button
                className="btn btn-sm btn-success rounded-md text-white"
                type="submit"
              >
                Submit Settings
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
