import React from 'react';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssuesForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
    return <IssuesForm />;
};

export default NewIssuePage;
