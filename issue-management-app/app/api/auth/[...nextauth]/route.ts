import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import authOptions from '@/app/auth/authOptions';

const handler = NextAuth(authOptions);
// 로그인 인증 관련 처리를 여러 곳에서 사용하기 위해 따로 설정후 해당 클래스에서 인증 처리, 세션 전역으로 사용하기 위해서임

export { handler as GET, handler as POST };
