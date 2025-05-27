import React from 'react';
import Link from 'next/link';
import { LangSelect } from '../LangSelect/LangSelect';
import Image from 'next/image';
import { MenuItem } from '../MenuItem/MenuItem';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { MobileMenu } from '../MobileMenu/MobileMenu';

type HeaderProps = {
  lang: string;
};

export async function Header({ lang }: HeaderProps) {
  const dic = await getDictionary(lang as 'en' | 'el');
  const menuItems = [
    { id: 1, name: dic.home, href: `/${lang}`, icon: 'pi pi-home' },
    { id: 2, name: dic.about, href: `/${lang}/about`, icon: 'pi pi-info-circle' },
  ];
  return (
    <header className="bg-[#7254f3]  text-white p-4 flex items-center justify-start">
      <Link href={`/${lang}`} className="text-2xl font-bold" aria-label="Logo">
        <Image src="/logo5.webp" alt="Hired" width={150} height={150} priority={true} />
      </Link>
      <nav className="hidden sm:flex space-x-4 flex-grow mr-[20px] justify-end">
        {menuItems.map((item) => (
          <MenuItem key={item.id} id={item.id} href={item.href} name={item.name} icon={item.icon} />
        ))}
      </nav>
      <MobileMenu menuItems={menuItems} />
      <LangSelect lang={lang} />
    </header>
  );
}
