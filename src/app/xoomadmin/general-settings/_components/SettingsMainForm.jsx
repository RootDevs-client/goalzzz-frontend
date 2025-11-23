'use client';

import TabButtonItem from '@/components/Global/TabButtonItem';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import uploadImage from '@/lib/helpers/uploadImage';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner } from 'react-icons/im';
import * as Yup from 'yup';
import AppDownloadLinksForm from './AppDownloadLinksForm';
import GeneralSettingsForm from './GeneralSettingsForm';
import LogoAndIconForm from './LogoAndIconForm';
import PrivacyAndPolicyForm from './PrivacyAndPolicyForm';
import SocialLinksForm from './SocialLinksForm';
import TermsAndConditionForm from './TermsAndConditionForm';

export default function SettingsMainForm() {
  const [currentTab, setCurrentTab] = useState(0);
  const [siteLogo, setSiteLogo] = useState(null);
  const [siteLogoOnline, setSiteLogoOnline] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [siteIconOnline, setSiteIconOnline] = useState(null);
  const [timezoneOption, setTimezoneOption] = useState('');
  const [languageOption, setLanguageOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allowedCountries, setAllowedCountries] = useState([]);

  const [terms, setTerms] = useState('');
  const [policy, setPolicy] = useState('');

  const tabs = [
    'General Settings',
    'Apps & Social Links',
    'Logo & Icon',
    'Terms and Condition',
    'Privacy and Policy',
    'App Download Links',
  ];

  const [initialValues, setInitialValues] = useState({
    company_name: '',
    site_title: '',
    timezone: {},
    language: {},
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    site_logo: 'https://via.placeholder.com/300',
    site_icon: 'https://via.placeholder.com/300',
    terms: '<p>Write terms and conditions</p>',
    policy: '<p>Write privacy and policy</p>',
    ios_download_link: '',
    android_download_link: '',
    days_highlight: 0,
    days_news: 0,
    allowedCountries: [],
  });

  useEffect(() => {
    async function getSettings() {
      try {
        const { data } = await xoomBackendUrl.get(
          '/api/admin/administration-settings'
        );

        if (data?.data !== null) {
          setInitialValues(data?.data);
          setTimezoneOption(data?.data?.timezone);
          setLanguageOption(data?.data?.language);
          setSiteLogoOnline(data?.data?.site_logo);
          setSiteIconOnline(data?.data?.site_icon);
          setTerms(data?.data?.terms);
          setPolicy(data?.data?.policy);
          setAllowedCountries(data?.data?.allowedCountries || []);
        }
      } catch (error) {
        console.error('Error fetching general settings:', error);
      }
    }
    getSettings();
  }, []);

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required('Company Name Required!'),
    site_title: Yup.string().required('Site Title Required!'),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    let siteLogoUrl = siteLogoOnline
      ? siteLogoOnline
      : `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/company-logo.png`;
    let siteIconUrl = siteIconOnline
      ? siteIconOnline
      : `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/company-logo.png`;

    if (siteLogo) siteLogoUrl = await uploadImage(siteLogo);
    if (siteIcon) siteIconUrl = await uploadImage(siteIcon);

    values.site_logo = siteLogoUrl;
    values.site_icon = siteIconUrl;
    values.allowedCountries = allowedCountries;

    const { data } = await xoomBackendUrl.post(
      '/api/admin/administration-settings/update',
      values
    );

    if (data?.status) {
      setIsSubmitting(false);
      toast.success('General settings updated successfully!');
    } else {
      setIsSubmitting(false);
      toast.error('Something went wrong!');
    }
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
              <div className="flex flex-col col-span-1 md:col-span-3">
                {tabs.map((tab, index) => (
                  <TabButtonItem
                    key={index}
                    tab={tab}
                    onClick={() => handleTabChange(index)}
                    active={currentTab === index}
                  />
                ))}
              </div>
              <div className="border border-gray-200 rounded-lg p-2 shadow w-full col-span-1 md:col-span-9 bg-white">
                <div hidden={currentTab === 0 ? false : true}>
                  <GeneralSettingsForm
                    setTimezoneOption={setTimezoneOption}
                    timezoneOption={timezoneOption}
                    setFieldValue={setFieldValue}
                    setLanguageOption={setLanguageOption}
                    languageOption={languageOption}
                    allowedCountries={allowedCountries}
                    setAllowedCountries={setAllowedCountries}
                  />
                </div>

                <div hidden={currentTab === 1 ? false : true}>
                  <SocialLinksForm />
                </div>

                <div hidden={currentTab === 2 ? false : true}>
                  <LogoAndIconForm
                    values={values}
                    setFieldValue={setFieldValue}
                    setSiteIcon={setSiteIcon}
                    siteIcon={siteIcon}
                    setSiteLogo={setSiteLogo}
                    siteLogo={siteLogo}
                  />
                </div>

                <div hidden={currentTab === 3 ? false : true}>
                  <TermsAndConditionForm
                    terms={terms}
                    setTerms={setTerms}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div hidden={currentTab === 4 ? false : true}>
                  <PrivacyAndPolicyForm
                    policy={policy}
                    setPolicy={setPolicy}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div hidden={currentTab === 5 ? false : true}>
                  <AppDownloadLinksForm />
                </div>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="btn btn-success btn-sm mt-3 text-gray-700 disabled:bg-violet-200 disabled:text-violet-400"
                disabled={isSubmitting}
              >
                Update Settings{' '}
                {isSubmitting && <ImSpinner className="ml-2 animate-spin" />}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

// 'use client';

// import TabButtonItem from '@/components/Global/TabButtonItem';
// import { xoomBackendUrl } from '@/lib/axios/getAxios';
// import { useState } from 'react';

// import uploadImage from '@/lib/helpers/uploadImage';
// import { Form, Formik } from 'formik';
// import { useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { ImSpinner } from 'react-icons/im';
// import * as Yup from 'yup';
// import AppDownloadLinksForm from './AppDownloadLinksForm';
// import GeneralSettingsForm from './GeneralSettingsForm';
// import LogoAndIconForm from './LogoAndIconForm';
// import PrivacyAndPolicyForm from './PrivacyAndPolicyForm';
// import SocialLinksForm from './SocialLinksForm';
// import TermsAndConditionForm from './TermsAndConditionForm';

// export default function SettingsMainForm() {
//   const [currentTab, setCurrentTab] = useState(0);
//   const [siteLogo, setSiteLogo] = useState(null);
//   const [siteLogoOnline, setSiteLogoOnline] = useState(null);
//   const [siteIcon, setSiteIcon] = useState(null);
//   const [siteIconOnline, setSiteIconOnline] = useState(null);
//   const [timezoneOption, setTimezoneOption] = useState('');
//   const [languageOption, setLanguageOption] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [terms, setTerms] = useState('');
//   const [policy, setPolicy] = useState('');

//   const tabs = [
//     'General Settings',
//     'Apps & Social Links',
//     'Logo & Icon',
//     'Terms and Condition',
//     'Privacy and Policy',
//     'App Download Links',
//   ];

//   const [initialValues, setInitialValues] = useState({
//     company_name: '',
//     site_title: '',
//     timezone: {},
//     language: {},
//     facebook: 'https://www.facebook.com/',
//     youtube: 'https://www.youtube.com/',
//     instagram: 'https://www.instagram.com/',
//     site_logo: 'https://via.placeholder.com/300',
//     site_icon: 'https://via.placeholder.com/300',
//     terms: '<p>Write terms and conditions</p>',
//     policy: '<p>Write privacy and policy</p>',
//     ios_download_link: '',
//     android_download_link: '',
//     days_highlight: 0,
//     days_news: 0,
//   });

//   useEffect(() => {
//     async function getSettings() {
//       try {
//         const { data } = await xoomBackendUrl.get(
//           '/api/admin/administration-settings'
//         );

//         if (data?.data !== null) {
//           setInitialValues(data?.data);
//           setTimezoneOption(data?.data?.timezone);
//           setLanguageOption(data?.data?.language);
//           setSiteLogoOnline(data?.data?.site_logo);
//           setSiteIconOnline(data?.data?.site_icon);
//           setTerms(data?.data?.terms);
//           setPolicy(data?.data?.policy);
//         }
//       } catch (error) {
//         console.error('Error fetching general settings:', error);
//       }
//     }
//     getSettings();
//   }, []);

//   const validationSchema = Yup.object().shape({
//     company_name: Yup.string().required('Company Name Required!'),
//     site_title: Yup.string().required('Site Title Required!'),
//   });

//   const handleSubmit = async (values) => {
//     setIsSubmitting(true);

//     let siteLogoUrl = siteLogoOnline
//       ? siteLogoOnline
//       : `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/company-logo.png`;
//     let siteIconUrl = siteIconOnline
//       ? siteIconOnline
//       : `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/company-logo.png`;

//     if (siteLogo) siteLogoUrl = await uploadImage(siteLogo);
//     if (siteIcon) siteIconUrl = await uploadImage(siteIcon);

//     values.site_logo = siteLogoUrl;
//     values.site_icon = siteIconUrl;

//     const { data } = await xoomBackendUrl.post(
//       '/api/admin/administration-settings/update',
//       values
//     );

//     if (data?.status) {
//       setIsSubmitting(false);
//       toast.success('General settings updated successfully!');
//     } else {
//       setIsSubmitting(false);
//       toast.error('Something went wrong!');
//     }
//   };

//   const handleTabChange = (tab) => {
//     setCurrentTab(tab);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//       enableReinitialize
//     >
//       {({ values, setFieldValue }) => (
//         <Form>
//           <div>
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
//               <div className="flex flex-col col-span-1 md:col-span-3">
//                 {tabs.map((tab, index) => (
//                   <TabButtonItem
//                     key={index}
//                     tab={tab}
//                     onClick={() => handleTabChange(index)}
//                     active={currentTab === index}
//                   />
//                 ))}
//               </div>
//               <div className="border border-gray-200 rounded-lg p-2 shadow w-full col-span-1 md:col-span-9 bg-white">
//                 <div hidden={currentTab === 0 ? false : true}>
//                   <GeneralSettingsForm
//                     setTimezoneOption={setTimezoneOption}
//                     timezoneOption={timezoneOption}
//                     setFieldValue={setFieldValue}
//                     setLanguageOption={setLanguageOption}
//                     languageOption={languageOption}
//                   />
//                 </div>

//                 <div hidden={currentTab === 1 ? false : true}>
//                   <SocialLinksForm />
//                 </div>

//                 <div hidden={currentTab === 2 ? false : true}>
//                   <LogoAndIconForm
//                     values={values}
//                     setFieldValue={setFieldValue}
//                     setSiteIcon={setSiteIcon}
//                     siteIcon={siteIcon}
//                     setSiteLogo={setSiteLogo}
//                     siteLogo={siteLogo}
//                   />
//                 </div>

//                 <div hidden={currentTab === 3 ? false : true}>
//                   <TermsAndConditionForm
//                     terms={terms}
//                     setTerms={setTerms}
//                     setFieldValue={setFieldValue}
//                   />
//                 </div>

//                 <div hidden={currentTab === 4 ? false : true}>
//                   <PrivacyAndPolicyForm
//                     policy={policy}
//                     setPolicy={setPolicy}
//                     setFieldValue={setFieldValue}
//                   />
//                 </div>

//                 <div hidden={currentTab === 5 ? false : true}>
//                   <AppDownloadLinksForm />
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end w-full">
//               <button
//                 type="submit"
//                 className="btn btn-success btn-sm mt-3 text-gray-700 disabled:bg-violet-200 disabled:text-violet-400"
//                 disabled={isSubmitting}
//               >
//                 Update Settings{' '}
//                 {isSubmitting && <ImSpinner className="ml-2 animate-spin" />}
//               </button>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }
