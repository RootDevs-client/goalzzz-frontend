'use client';

import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { generateRandomId } from '@/lib/helpers/generateRandomId';
import getStreamObject from '@/lib/helpers/getStreamObject';
import { uploadImageToCloudinary } from '@/lib/helpers/uploadImageToCloudinary';
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

export default function CreateMatchForm({ queryString }) {
  const [teamOneImage, setTeamOneImage] = useState(null);
  const [teamTwoImage, setTeamTwoImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    fixture_id: queryString?.fixture_id || '',
    match_title: queryString?.title || '',
    time: queryString?.time || '',
    sports_type_name: queryString?.sports_type || 'football',
    is_hot: '0',
    status: '1',
    team_one_name: queryString?.t1_name || '',
    team_two_name: queryString?.t2_name || '',
    team_one_image_type: queryString?.t1_img ? 'url' : '',
    team_two_image_type: queryString?.t2_img ? 'url' : '',
    team_one_image: queryString?.t1_img || '',
    team_two_image: queryString?.t2_img || '',
    streaming_sources: getStreamObject(queryString?.title ? true : false),
  };

  const matchSchema = Yup.object().shape({
    match_title: Yup.string().required('Match Title is required!'),
    time: Yup.string().required('Match Time is required!'),
    sports_type_name: Yup.string().required('Sports type is required!'),
    fixture_id: Yup.string(),
    team_one_name: Yup.string().required('Name is required!.'),
    team_two_name: Yup.string().required('Name is required!'),
    status: Yup.string(),
    team_one_image_type: Yup.string(),
    team_two_image_type: Yup.string(),
    team_one_image: Yup.string(),
    team_two_image: Yup.string(),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    values.id = generateRandomId(15);
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
      const { data } = await xoomBackendUrl.post(
        '/api/admin/matches/create',
        liveMatchData
      );

      if (data.status) {
        toast.success('Live Matches Created Successfully!');
        setIsSubmitting(false);
        router.push('/goaladmin/manage-live');
      }
    } catch (error) {
      console.error('Error creating Live Matches:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={matchSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <div className="mt-5 p-2 border border-gray-200 rounded-lg">
            <div className="rounded-md border border-gray-200">
              <SetMatchInfo values={values} setFieldValue={setFieldValue} />
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
                type="submit"
                disabled={isSubmitting}
                className="btn btn-success rounded btn-sm capitalize disabled:bg-violet-200 disabled:text-violet-400"
              >
                Create Match{' '}
                {isSubmitting && <ImSpinner className="ml-2 animate-spin" />}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
