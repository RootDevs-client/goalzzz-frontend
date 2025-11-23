export default function NoDataFound({ width, skew }) {
  return (
    <div className={`w-${width || '6/12'} m-auto ${skew}`}>
      <img
        src="/images/vector_competitions_fav.png"
        alt="not found background"
        className="w-6/12 m-auto"
      />
      <h2 className="text-center text-lg font-medium uppercase">
        UNFORTUNATELY, THERE ARE NO DATA AT THE MOMENT!
      </h2>
    </div>
  );
}
