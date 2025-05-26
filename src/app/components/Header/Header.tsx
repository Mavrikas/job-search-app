import Link from 'next/link';
import { LangSelect } from '../LangSelect/LangSelect';
import Image from 'next/image';

export async function Header({ lang }: { lang: string }) {
  return (
    <header className="bg-[#7254f3] text-white p-4 flex items-center justify-between">
      <Link href={`/${lang}`} className="text-2xl font-bold">
        <Image src="/logo5.png" alt="Hired" width={150} height={150} />
      </Link>
      <LangSelect lang={lang} />
    </header>
  );
}
