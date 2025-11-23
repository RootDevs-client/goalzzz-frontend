export default function SkewCard({ children, title }) {
  return (
    <div className="flex flex-col items-center my-3">
      <div className="bg-primary h-16 w-full -skew-y-1">
        <div className="skew-y-1 flex items-center justify-start h-full p-4">
          <h4 className="text-white text-[16px] font-semibold">{title}</h4>
        </div>
      </div>
      <div className="bg-base-100 h-auto w-full -skew-y-1">
        <div className="skew-y-1 p-2">{children}</div>
      </div>
    </div>
  );
}
