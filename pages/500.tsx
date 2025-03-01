import PageError from '~/components/error/Error';

export default function Custom500() {
  return <PageError message="Server-side error occurred" status={500} />;
}
