import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkDown from 'react-markdown';
import delay from 'delay';

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

    await delay(2000);

    if (!issue) notFound();
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex my="2" className="space-x-3">
                <IssueStatusBadge status={issue.status} />
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className="prose" mt="4">
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </div>
    );
};

export default IssueDetailPage;
