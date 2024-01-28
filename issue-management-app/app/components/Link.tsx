import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import React from 'react';

interface Props {
    href: string;
    children: string;
}

// nextjs 링크 컴포넌트와 클라이언트 링크 컴포넌트를 동시에 사용할 수 없어
// 두 개의 컴포넌트를 결합하여 사용할 수 있는 컴포넌트 생성
// passHref legacyBehavior 속성 추가 필요

const Link = ({ href, children }: Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLink>
    );
};

export default Link;
