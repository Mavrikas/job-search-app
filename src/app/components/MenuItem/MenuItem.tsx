import Link from 'next/link';

export type MenuItemProps = {
  id: number;
  href: string;
  name: string;
  icon: string;
};

export async function MenuItem({ id, href, name, icon }: MenuItemProps) {
  return (
    <Link href={href} data-testid={`menu-item-${id}`} className="text-lg font-bold">
      <i className={`${icon} mr-2`}></i>
      {name}
    </Link>
  );
}
