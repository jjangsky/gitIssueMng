import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            // 환경변수를 사용하여 클라이언트 ID와 시크릿 키를 설정
            // ts에서 환경변수에 있는 값을 인지시키기 위해서는 끝에 느낌표를 붙여야 함
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
});

export { handler as GET, handler as POST };
