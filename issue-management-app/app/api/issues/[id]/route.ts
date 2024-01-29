import { issueSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import delay from 'delay';
import prisma from '@/prisma/client';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    // 이슈 수정 API
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
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
            title: body.title,
            description: body.description,
        },
    });

    return NextResponse.json(updatedIssue);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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
