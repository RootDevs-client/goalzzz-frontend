import UsersUpdate from '../../_components/UsersUpdate';

export const metadata = {
  title: 'Goalzzz Admin | Edit User',
};

export default async function Page({ params }) {
  const { user_id } = params;

  return <UsersUpdate id={user_id} />;
}
