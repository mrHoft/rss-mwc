import type { Route } from './+types/home';
import CharactersList from '~/components/list/List';
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

export default function Home({ loaderData }: Route.ComponentProps) {
  if (loaderData.error) return <PageError message={loaderData.error.message} status={loaderData.error.status} />;

  return <CharactersList data={loaderData.data} total={loaderData.meta?.pagination.total} />;
}
