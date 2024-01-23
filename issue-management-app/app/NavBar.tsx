import Link from 'next/link';
import React from 'react';
import { FaTasks } from 'react-icons/fa';

const NavBar = () => {
    const links = [
        { lavel: 'Dashboard', href: '/' },
        { lavel: 'Issues', href: '/issues' },
    ];
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14">
            <Link href="/">
                <FaTasks />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <Link
                        className="text-zinc-500 hover:text-zinc-800 transition-colors"
                        key={link.href}
                        href={link.href}
                    >
                        {link.lavel}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
