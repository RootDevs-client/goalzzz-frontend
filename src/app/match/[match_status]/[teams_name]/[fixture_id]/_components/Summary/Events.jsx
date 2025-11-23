import { BiFootball } from 'react-icons/bi';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

export default function Events({ eventData, matchData }) {
  const awayTeam = matchData?.participants.find(
    (team) => team?.meta?.location === 'away'
  )?.id;

  let newArray = [];

  eventData?.data?.events.forEach((event) => {
    const formattedEvent = {
      participant_id: event.participant_id || '',
      minute: event.minute || '',
      name: event.type.name || '',
      code: event.type.code || '',
      player: event.player_name || '',
      related_player: event.related_player_name || '',
    };

    if (
      event.type.code === 'yellowcard' ||
      event.type.code === 'redcard' ||
      event.type.code === 'substitution' ||
      event.type.code === 'VAR_CARD' ||
      event.type.code === 'goal' ||
      event.type.code === 'owngoal' ||
      event.type.code === 'VAR'
    ) {
      newArray.push(formattedEvent);
    }
  });

  const renderEvent = (event) => {
    switch (event.code) {
      case 'yellowcard':
        return yellowCard(event);
      case 'redcard':
        return redCard(event);
      case 'substitution':
        return substitution(event);
      case 'VAR':
        return VAR(event);
      case 'VAR_CARD':
        return VAR_CARD(event);
      case 'goal':
        return goal(event);
      case 'owngoal':
        return ownGoal(event);
      default:
        return null;
    }
  };

  const substitution = (event) => {
    return (
      <>
        <div className="flex flex-col gap-1">
          <BsFillArrowRightCircleFill className="text-xl text-green-500" />
          <BsFillArrowLeftCircleFill className="text-xl text-red-500" />
        </div>
        <div className="font-semibold">
          <p>{event.player}</p>
          <p>{event.related_player}</p>
        </div>
      </>
    );
  };

  const yellowCard = (event) => {
    return (
      <>
        <div className="bg-yellow-400 w-6 h-8 rounded"></div>
        <p className="font-semibold">{event.player}</p>
      </>
    );
  };

  const redCard = (event) => {
    return (
      <>
        <div className="bg-red-600 w-6 h-8 rounded"></div>
        <p className="font-semibold">{event.player}</p>
      </>
    );
  };

  const goal = (event) => {
    return (
      <>
        <BiFootball className="text-2xl" />
        <p className="font-semibold">{event.player}</p>
      </>
    );
  };

  const ownGoal = (event) => {
    return (
      <>
        <BiFootball className="text-2xl" />
        <p className="font-semibold">{event.player}</p>
      </>
    );
  };

  const VAR_CARD = (event) => {
    return (
      <>
        <img src="/icons/var.png" alt="var-logo" className="w-6 rounded-md" />
        <div className="font-semibold">
          <p>{event.player}</p>
          <p>Goal Confirm</p>
        </div>
      </>
    );
  };

  const VAR = (event) => {
    return (
      <>
        <img src="/icons/var.png" alt="var-logo" className="w-6 rounded-md" />
        <div className="font-semibold">
          <p>{event.player}</p>
          <p>Goal Confirm</p>
        </div>
      </>
    );
  };

  return (
    <div className="mt-10 skew-y-[1deg]">
      {newArray
        .sort((a, b) => b.minute - a.minute)
        .map((event, index) => (
          <div
            key={index}
            className="bg-base-100 rounded w-full lg:max-w-lg mx-auto flex items-center gap-5 px-4 h-16 mt-3"
          >
            <h4>
              {event?.minute}
              {`'`}
            </h4>
            <div
              className={`flex ${
                awayTeam === event.participant_id
                  ? 'flex-row-reverse'
                  : 'flex-row]'
              } items-center justify-start w-full gap-2 p-2`}
            >
              {renderEvent(event)}
            </div>
          </div>
        ))}
    </div>
  );
}
