import GlobalLoading from '@/components/Global/GlobalLoading';
import SunEditor from '@/components/Global/SunEditor';

export default function TermsAndConditionForm({
  terms,

  setFieldValue,
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="text-lg font-semibold">Terms and conditions</span>
      </div>
      {!terms ? (
    <GlobalLoading/>
      ) : (
        <SunEditor
          key="new-key"
          height={200}
          setFieldValue={setFieldValue}
          inputFiled="terms"
          defaultValue={terms}
        />
      )}
    </label>
  );
}
