'use client';

// 세션에 접근하기 위해 클라이언트 컴포넌트로 전환

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren) => {
    // 인자값으로 리액트 컴포넌트를 받고 세션 프로바이더로 감싼 후 반환.
    // useSession을 사용하기 위해서는 세션 프로바이더로 감싸야함

    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
