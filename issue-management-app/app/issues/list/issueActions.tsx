import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const issueActions = () => {
    // 이슈 생성 버튼 컴포넌트
    return (
        <Flex className="mb-5" justify="between">
            <IssueStatusFilter />
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </Flex>
    );
};

export default issueActions;
