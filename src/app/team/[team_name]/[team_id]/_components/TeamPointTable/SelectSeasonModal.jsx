import { useAppContext } from '@/contexts/XoomAppContent';
import { RxCross2 } from 'react-icons/rx';

export default function SelectSeasonModal({ activeSeasons }) {
  const { setSelectedSeasonTeam } = useAppContext();

  const handleSeasonClick = (season) => {
    // Set the selected season data when a season is clicked
    setSelectedSeasonTeam(season);
  };

  return (
    <>
      <input
        type="checkbox"
        id="select_season_modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box rounded-none -skew-y-[1deg] p-0 w-full sm:w-[400px] h-fit overflow-y-hidden bg-white ">
          <div className="bg-primary ">
            <div className="flex items-center justify-between py-5 px-2 skew-y-[1deg]">
              <h4 className="text-white px-5">Choose Season</h4>
              <label
                htmlFor="select_season_modal"
                className="absolute cursor-pointer right-2 top-2 outline-none"
              >
                <RxCross2 className="text-xl text-white hover:text-secondary " />
              </label>
            </div>
          </div>
          <div className="skew-y-[1deg] p-4">
            {activeSeasons?.map((season) => (
              <div key={season?.id} onClick={() => handleSeasonClick(season)}>
                <label
                  htmlFor="select_season_modal"
                  className="flex items-center gap-5 mb-5 sm:px-10 cursor-pointer"
                >
                  <img
                    src={season?.league?.image_path}
                    alt="league logo"
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full ring-1 ring-black p-0.5"
                  />
                  <div>
                    <h4>{season?.league?.name}</h4>
                    <p className="text-sm">{season?.name}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="select_season_modal">
          Close
        </label>
      </div>
    </>
  );
}
