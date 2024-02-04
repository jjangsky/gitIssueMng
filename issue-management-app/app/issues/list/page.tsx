import React from 'react';
import { Table } from '@radix-ui/themes';
import Link from '../../components/Link';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import IssueActions from './issueActions';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
    searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

// tailwindcss에서는 반응형 웹을 위해 hidden 클래스를 제공
// md -> 중간 사이즈 이상일 경우, table-cell 클래스를 추가하여 테이블 셀로 표시

const IssuesPage = async ({ searchParams }: Props) => {
    const columns: { label: string; value: keyof Issue; className?: string }[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { label: 'Created At', value: 'createdAt', className: 'hidden md:table-cell' },
    ];

    const statuses = Object.values(Status); // 객체를 key, value로 열거함
    const status = statuses.includes(searchParams.status) // status가 존재하는지 확인(존재하면 해당 status를 반환, 존재하지 않으면 undefined 반환)
        ? (searchParams.status as Status)
        : undefined;

    // orderBy가 존재하는지 확인(존재하면 해당 orderBy를 반환, 존재하지 않으면 undefined 반환)
    const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined;

    const page = parseInt(searchParams.page) || 1; // page가 존재하는지 확인(존재하면 해당 page를 반환, 존재하지 않으면 1을 반환
    const pageSize = 10;

    const where = {
        status,
    };

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });

    return (
        <div>
            <IssueActions />
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
            <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
        </div>
    );
};

export const dynamic = 'force-dynamic';
// export const revalidate = 60; // 60초마다 재검증 처리
/**
 * 동적 렌더링 -> 요청 시점에 라우터가 렌더링됨
 * 정적 렌더링 -> 빌드 시점에 라우터가 렌더링됨
 * next.js는 가변의 요소가 존재할 때 동적 렌더링으로 분류함  ->  [id].tsx
 * 정적 렌더링은 빌드 시점에 라우터가 렌더링되기 때문에, 빌드 시점에는 존재하지 않는 페이지를 렌더링할 수 없음
 * (ex. 이슈 생성 후, 전체 목록 페이지에서 조회 안됨 -> 빌드 시점에는 존재하지 않는 페이지)
 *
 * 해당 dynamic 옵션을 사용하여 동적 렌더링을 강제함
 */

/**
 * 클라이언트 캐시
 * nextjs는 페이지를 렌더링할 때, 클라이언트 캐시를 사용함
 * 즉, 페이지에 대한 정보를 브라우저에 저장하여, 다음에 해당 페이지를 방문할 때, 서버에 요청하지 않고 브라우저에 저장된 정보를 사용함
 * 이러한 이슈로 인해 dynamic 옵션을 사용하여 동적 렌더링을 강제해도 이슈 생성 후, 바로 조회할 수 없고 새로고침의 과정이 필요함
 * -> 이슈 생성 및 수정 api 호출 후, router.refresh() 함수를 사용하여 새로고침 없이 페이지를 갱신할 수 있음
 */

export default IssuesPage;
