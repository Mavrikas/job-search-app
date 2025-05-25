import { LangSelect } from '../LangSelect/LangSelect';

export async function Header({ lang }: { lang: string }) {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Hired!</h1>

      <LangSelect lang={lang} />
    </header>
  );
}
