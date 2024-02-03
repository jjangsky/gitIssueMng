'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
    console.log('IssueStatusFilter');
    console.log(statuses);
    const router = useRouter();

    return (
        <Select.Root
            onValueChange={(status) => {
                const query = status ? `?status=${status}` : '';
                router.push('/issues/list' + query);
            }}
        >
            <Select.Trigger placeholder="상태값으로 필터링하기..." />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || 'ALL'}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;
