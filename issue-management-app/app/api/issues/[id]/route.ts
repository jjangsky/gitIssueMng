import { issueSchema, patchIssueSchma } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import delay from 'delay';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    // 세션 정보를 확인하여 세션이 없는 경우 401 에러 반환
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    // 이슈 수정 API
    const body = await request.json();
    const validation = patchIssueSchma.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { assignedToUserId, title, description } = body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!user) {
            return NextResponse.json({ error: '담당자를 찾을 수 없습니다.' }, { status: 404 });
        }
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) {
        return NextResponse.json({ error: '이슈를 찾을 수 없습니다.' }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(params.id) },
        data: {
            title,
            description,
            assignedToUserId,
        },
    });

    return NextResponse.json(updatedIssue);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    // 세션 정보를 확인하여 세션이 없는 경우 401 에러 반환
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    // 이슈 삭제 API
    await delay(1000);
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) {
        return NextResponse.json({ error: '이슈를 찾을 수 없습니다.' }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.delete({
        where: { id: parseInt(params.id) },
    });

    return NextResponse.json(updatedIssue);
}
