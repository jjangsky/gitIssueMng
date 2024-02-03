import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkDown from 'react-markdown';
import delay from 'delay';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteUssueButton from './DeleteIssueButton';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './AssigneeSelect';

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);

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
        // Grid 컴포넌트를 사용하여 반응형 웹 구현
        // initial -> 초기값, md -> 중간 사이즈 이상일 경우, 2개의 컬럼으로 표시
        <Grid columns={{ initial: '1', md: '5' }} gap="5">
            <Box className="lg:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect issue={issue} />
                        <EditIssueButton issueId={issue.id} />
                        <DeleteUssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;
