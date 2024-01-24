'use client';
// use client가 파일에 정의되면 하위 구성 요소를 포함한 모든 모듈이 클라이언트 번들의 일부로 간주
// import 전에 지시해야함

import Link from 'next/link';
import React from 'react';
import { FaTasks } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const currentPath = usePathname();
    // 현재 url 주소를 가져오는 hook

    const links = [
        { lavel: 'Dashboard', href: '/' },
        { lavel: 'Issues', href: '/issues' },
    ];
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14">
            <Link href="/">
                {/*리액트 이미지 아이콘*/}
                <FaTasks />
            </Link>
            {/*
             * nextJs는 파일 구조로 라우팅
             * /issues 경로에 대한 라우팅을 설정하지 않아서 파일 디렉토리에 issues 폴더를 만들고
             * 그 안에 page.tsx 파일을 만들어서 라우팅을 설정
             */}
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <Link
                        // 현재 url 주소에 맞춰 nav 이벤트 처리
                        className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'}
                            hover:text-zinc-800 transition-colors`}
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