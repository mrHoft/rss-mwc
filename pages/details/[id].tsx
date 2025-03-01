import { useRouter } from 'next/router';
import CharactersList from '~/components/list/List.tsx';
import PageDetails from '~/components/details/Details';

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  return (
    <>
      <CharactersList />
      <PageDetails id={id} />
    </>
  );
}
