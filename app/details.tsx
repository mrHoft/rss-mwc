import type { Route } from './+types/details';
import { useNavigate } from 'react-router';
import CharactersList from '~/components/list/List';
import PageDetails from '~/components/details/Details';
import apiRequest from '~/api/request';
import PageError from '~/components/error/Error';

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const data = await apiRequest.characters({
    page: Number(searchParams.get('page')) || 1,
    query: searchParams.get('search') ?? undefined,
  });
  return data;
}

export default function Details({ params, loaderData }: Route.ComponentProps) {
  const { id } = params;
  const navigate = useNavigate();

  const handleBack = () => {
    if (id) navigate('/');
  };

  if (loaderData.error) return <PageError message={loaderData.error.message} status={loaderData.error.status} />;

  return (
    <div className="details" onClick={handleBack}>
      <CharactersList data={loaderData.data} total={loaderData.meta?.pagination.total} />
      <PageDetails id={id} />
    </div>
  );
}
