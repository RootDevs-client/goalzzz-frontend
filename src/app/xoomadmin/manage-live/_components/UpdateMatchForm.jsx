'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { uploadImageToCloudinary } from '@/lib/helpers/uploadImageToCloudinary';
import useGetSingleMatch from '@/lib/hooks/useGetSingleMatch';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner } from 'react-icons/im';
import * as Yup from 'yup';
import SetMatchInfo from './SetMatchInfo';
import SetStreamingSources from './SetStreamingSources';
import SetTeamInfo from './SetTeamInfo';

export default function EditMatchForm({ match_id }) {
  const { singleMatch, singleMatchLoading } = useGetSingleMatch(match_id);

  const router = useRouter();
  const [teamOneImage, setTeamOneImage] = useState(null);
  const [teamTwoImage, setTeamTwoImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const matchSchema = Yup.object().shape({
    // match_title: Yup.string().required("Match Title is required!"),
    // time: Yup.string().required("Match Time is required!"),
    // fixture_id: Yup.string(),
    // team_one_name: Yup.string().required("Name is required!."),
    // team_two_name: Yup.string().required("Name is required!"),
    // status: Yup.string(),
    // team_one_image_type: Yup.string(),
    // team_two_image_type: Yup.string(),
    // team_one_image: Yup.string(),
    // team_two_image: Yup.string(),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    values.utcTime = moment(values.time).utc().unix();

    let teamOneImageUrl = '';
    let teamTwoImageUrl = '';

    if (teamOneImage) {
      const uploadPreset = 'Goalzzz';
      teamOneImageUrl = await uploadImageToCloudinary(
        teamOneImage,
        uploadPreset
      );
    }

    if (teamTwoImage) {
      const uploadPreset = 'Goalzzz';
      teamOneImageUrl = await uploadImageToCloudinary(
        teamTwoImage,
        uploadPreset
      );
    }

    const liveMatchData = {
      ...values,
      team_one_image:
        values.team_one_image_type === ''
          ? `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/team-logo.png`
          : values.team_one_image_type === 'image'
          ? teamOneImageUrl
          : values?.team_one_image,
      team_two_image:
        values.team_two_image_type === ''
          ? `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/team-logo.png`
          : values.team_two_image_type === 'image'
          ? teamTwoImageUrl
          : values?.team_two_image,
    };

    try {
      const { data } = await xoomBackendUrl.put(
        `/api/admin/matches/${match_id}`,
        liveMatchData
      );
      if (data.status) {
        toast.success('Live Matches Updated Successfully!');
        setIsSubmitting(false);
        router.push('/xoomadmin/manage-live');
      } else {
        setIsSubmitting(false);
        toast.error(data?.message);
      }
    } catch (error) {
      console.error('Error creating Live Matches:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {singleMatchLoading ? (
        <div>
          <GlobalLoading />
        </div>
      ) : (
        <Formik
          initialValues={singleMatch}
          validationSchema={matchSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <div className="mt-5 p-2">
                <div className="rounded-md border border-gray-200 p-4">
                  <div className="rounded-md border border-gray-200">
                    <SetMatchInfo
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </div>

                  <SetTeamInfo
                    values={values}
                    teamOneImage={teamOneImage}
                    setTeamOneImage={setTeamOneImage}
                    teamTwoImage={teamTwoImage}
                    setTeamTwoImage={setTeamTwoImage}
                  />

                  <div>
                    <SetStreamingSources
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  </div>

                  <div className="fixed bottom-[50px] right-[47px] mt-3 animate-bounce hover:animate-none">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-success btn-sm disabled:bg-violet-200 disabled:text-violet-400"
                    >
                      Update Match{' '}
                      {isSubmitting && (
                        <ImSpinner className="ml-2 animate-spin" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
