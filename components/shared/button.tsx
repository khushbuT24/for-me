import Link from 'next/link';

export function Button({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) { return <Link className={`button ${secondary ? 'secondary' : ''}`} href={href}>{children}</Link> }
