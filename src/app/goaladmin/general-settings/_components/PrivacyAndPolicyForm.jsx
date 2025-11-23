import GlobalLoading from '@/components/Global/GlobalLoading';
import SunEditor from '@/components/Global/SunEditor';

export default function PrivacyAndPolicyForm({
  policy,
  setFieldValue,
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="text-lg font-semibold">Privacy and policy</span>
      </div>
      {!policy ? (
      <GlobalLoading/>
      ) : (
        <SunEditor
          key="new-key"
          height={200}
          setFieldValue={setFieldValue}
          inputFiled="policy"
          defaultValue={policy}
        />
      )}
    </label>
  );
}
