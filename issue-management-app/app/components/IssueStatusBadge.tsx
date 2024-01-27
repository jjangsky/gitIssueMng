import React from 'react';
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

// 상태값에 따라 렌더링되는 뱃지의 색상과 레이블을 정의
const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
    // color의 경우 어떤 값이 적용할 수 있는지 타입을 지정해줘야 함

    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};

export default IssueStatusBadge;
