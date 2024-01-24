import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

// zod를 사용하여 파라미터 검증 처리
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export async function POST(request: NextRequest) {
    // 이슈 생성 시 사용되는 API
    // 인자는 NextRequest 타입 받음

    // api 검증을 위해 zod 설치 필요
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    // safeParse 메소드는 유효성 검사 실패시 시스템을 멈추는 대신, 오류가 담긴 객체를 리턴

    // 함수를 호출하기 앞서 현재 앱에서 모든 API가 동일한 Prisma 인스턴스와
    // 상호작용 할 수 있도록 PrismaClient 생성 필요
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 });
}