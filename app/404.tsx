import PageError from '~/components/error/Error';

export default function Page404() {
  return <PageError message="No such page" status={404} />;
}
