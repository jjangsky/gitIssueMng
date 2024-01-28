import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

interface Props {
    params: { id: string };
}

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: Number(params.id) },
    });
    console.log('여기는 오냐?');
    console.log(issue);
    if (!issue) notFound();
    return <IssueForm issue={issue} />;
};

export default EditIssuePage;
