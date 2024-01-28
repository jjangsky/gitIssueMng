import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Table } from '@radix-ui/themes';
import IssueActions from './issueActions';

const LoadingIssuesPage = () => {
    const issues = [1, 2, 3, 4, 5];

    // 해당 로딩 컴포넌트는 issues 내부에서 사용되었으므로
    // 이슈와 관련된 모든 페이지에서 로딩 컴포넌트가 실핻된다.

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
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton />
                                <div className="block md:hidden">
                                    <Skeleton />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default LoadingIssuesPage;
