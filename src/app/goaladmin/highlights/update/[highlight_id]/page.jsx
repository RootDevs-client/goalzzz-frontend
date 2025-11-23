import UpdateHighlight from '../../_components/UpdateHighlight';

export default async function page({ params }) {
  const { highlight_id } = params;

  return <UpdateHighlight highlightId={highlight_id} />;
}
