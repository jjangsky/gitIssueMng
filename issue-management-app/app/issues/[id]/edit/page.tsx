import React from 'react';
import IssueForm from '../../_components/IssueForm';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

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
