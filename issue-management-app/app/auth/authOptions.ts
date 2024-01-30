import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';

// 세션같은 경우 nextAuth 옵션이 필요 하기 때문에 따로 클래스로 분리하여 여러곳에서 사용함
const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            // 환경변수를 사용하여 클라이언트 ID와 시크릿 키를 설정
            // ts에서 환경변수에 있는 값을 인지시키기 위해서는 끝에 느낌표를 붙여야 함
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        // authjs는 adapter를 사용하는 경우 jwt로 전환되는데
        // jwt는 구글과 같은 auth provider를 사용할 수 없음 -> 별도로 세션 프로퍼티 설정 필요
        strategy: 'jwt',
    },
};

export default authOptions;
