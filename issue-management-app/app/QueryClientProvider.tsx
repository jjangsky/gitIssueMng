'use client';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
const QueryClientProvider = ({ children }: PropsWithChildren) => {
    // react-query를 사용하기 컴포넌트를 생성하여 전역으로 배치
    // 마치, 세션을 전역으로 사용하기 위해 인가 provider를 전역으로 배치하는 것과 같음
    return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
