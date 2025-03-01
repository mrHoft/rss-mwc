import PageError from '~/components/error/Error';

export default function Custom404() {
  return <PageError message="No such page" status={404} />;
}
