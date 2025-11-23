export default function MatchFieldView({
  isUpcoming,
  isFinished,
  totalGoals,
  homeTeamCoach,
  awayTeamCoach,
}) {
  return (
    <div className="relative">
      <img
        src="/images/football_field.png"
        alt="Football field"
        className="w-full aspect-video fit -skew-y-[0.5deg]"
      />
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="bg-primary rounded-md w-8/12 h-72 flex flex-col items-center justify-center text-white">
          {isUpcoming && (
            <div className="bg-primary rounded-md w-8/12 h-72 flex flex-col items-center justify-center text-white">
              <h4>Match hasn{"'"}t started yet</h4>
              <p className="text-lg">0 - 0</p>
            </div>
          )}

          {isFinished && (
            <div className="bg-primary rounded-md w-full h-72">
              <div className="flex flex-col items-center justify-between text-white h-full">
                <div></div>
                <div className="text-center">
                  <h4>Match ended</h4>
                  <p className="text-lg">{totalGoals}</p>
                </div>

                <div className="w-full flex items-end justify-between p-2 mt-5">
                  <div className="text-start">
                    <h4>{homeTeamCoach?.common_name}</h4>
                    <h4>Coach</h4>
                  </div>
                  <div className="text-end">
                    <h4>{awayTeamCoach?.common_name}</h4>
                    <h4>Coach</h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
