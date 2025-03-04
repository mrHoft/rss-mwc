'use client';

import PageError from '~/components/error/Error';

export default function Error({ error }: { error: Error; reset: () => void }) {
  return <PageError message={error.message} status={500} />;
}
