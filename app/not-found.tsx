import PageError from '~/components/error/Error';

export default function NotFoundPage() {
  return <PageError message="No such page" status={404} />;
}
