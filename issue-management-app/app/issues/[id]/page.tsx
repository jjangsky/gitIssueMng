import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
    const numericId = parseInt(params.id);

    if (isNaN(numericId) || numericId.toString() !== params.id) {
        // 숫자가 아닌 경우 404 처리, 문자열로 param을 보내면 오류 처리 됨
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: { id: Number(params.id) },
    });

    if (!issue) notFound();
    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    );
};

export default IssueDetailPage;
