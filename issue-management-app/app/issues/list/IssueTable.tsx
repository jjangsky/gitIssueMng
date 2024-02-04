import { Table } from '@radix-ui/themes';
import IssueActions from './issueActions';
import NextLink from 'next/link';
import React from 'react';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';

export interface IssueQuery {
    status: Status;
    orderBy: keyof Issue;
    page: string;
}

interface Props {
    searchParams: IssueQuery;
    issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map((column) => (
                        <Table.ColumnHeaderCell key={column.value}>
                            <NextLink
                                href={{
                                    query: { ...searchParams, orderBy: column.value },
                                }}
                            >
                                {column.label}
                            </NextLink>
                            {column.value === searchParams.orderBy && (
                                <ArrowUpIcon className="inline" />
                            )}
                        </Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
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
    );
};

// 정렬 필드를 정의 후 export 하여 추상화하며 다른 컴포넌트에서 사용
const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created At', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
