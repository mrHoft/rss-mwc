type TSystemColorScheme = 'dark' | 'light';

export default function getSystemColorScheme(): TSystemColorScheme {
  const dark =
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return dark ? 'dark' : 'light';
}
