import React from 'react';
import { Table } from '@radix-ui/themes';
import Link from '../components/Link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import delay from 'delay';
import LoadingIssuesPage from './loading';
import IssueActions from './issueActions';

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    // tailwindcss에서는 반응형 웹을 위해 hidden 클래스를 제공
    // md -> 중간 사이즈 이상일 경우, table-cell 클래스를 추가하여 테이블 셀로 표시

    await delay(1000);

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                        Status
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                        CreatedAt(생성일자)
                    </Table.ColumnHeaderCell>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue, idx) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default IssuesPage;
