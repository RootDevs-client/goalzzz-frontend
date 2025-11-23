import { sportMonkUrl } from '@/lib/axios/getAxios';
import TeamDetails from './_components/TeamDetails';

export const metadata = {
  title: 'Goalzzz | Teams',
};

async function getTeamDetails(id) {
  try {
    const response = await sportMonkUrl.get(
      `/teams/${id}?include=activeSeasons.league;country;coaches.coach;upcoming.participants;upcoming.scores;upcoming.state;upcoming.league;latest.participants;latest.scores;latest.state;latest.league`
    );
    return response;
  } catch (error) {
    console.error('Error fetching team details:', error);
    return null;
  }
}

export default async function Page({ params }) {
  try {
    const teamId = params.team_id;

    const teamDetails = await getTeamDetails(teamId);

    if (!teamDetails.status === 200) {
      return 'Server Error!';
    } else {
      if (teamDetails?.data?.status) {
        return (
          <TeamDetails teamDetails={teamDetails.data.data} teamId={teamId} />
        );
      } else {
        return 'Server Error!';
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return 'Unexpected error occurred!';
  }
}
