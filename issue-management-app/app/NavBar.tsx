'use client';
// use client가 파일에 정의되면 하위 구성 요소를 포함한 모든 모듈이 클라이언트 번들의 일부로 간주
// import 전에 지시해야함

import Link from 'next/link';
import React from 'react';
import { FaTasks } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes';

// 현재 auth.js 를 사용하고 있으므로 지정한 api를 사용해 로그인/로그아웃 처리를 해야함

const NavBar = () => {
    // 현재 url 주소를 가져오는 hook
    const currentPath = usePathname();

    // 로그인 정보를 가져오는 hook
    const { status, data: session } = useSession();

    const links = [
        { lavel: 'Dashboard', href: '/' },
        { lavel: 'Issues', href: '/issues' },
    ];
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
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
                                    className={`${
                                        link.href === currentPath
                                            ? 'text-zinc-900'
                                            : 'text-zinc-500'
                                    }
                            hover:text-zinc-800 transition-colors`}
                                    key={link.href}
                                    href={link.href}
                                >
                                    {link.lavel}
                                </Link>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    {/* 사용자 이미지가 존재하지 않는 상황을 대비해서 !를 추가함*/}
                                    <Avatar
                                        src={session?.user!.image!}
                                        fallback="?"
                                        size="2"
                                        radius="full"
                                        className="cursor-pointer"
                                        referrerPolicy="no-referrer" // cors 정책을 위해 추가
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size="2">{session.user!.email}</Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href="/api/auth/signout">Logout</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;
