'use client';
import Skeleton from '@/app/components/Skeleton';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

const AssigneeSelect = () => {
    const {
        data: users,
        error,
        isLoading,
    } = useQuery<User[]>({
        queryKey: ['users'], // 사용할 key값
        queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data), // api 요청
        staleTime: 1000 * 60, // 60초 동안 캐시를 사용
        retry: 3, // 3번 재시도
    });

    if (isLoading) return <Skeleton />;
    if (error) return null;

    /**기존에는 useEffect로 api를 호출하였지만 react-query로 대체함*/

    // const [users, setUsers] = useState<User[]>([]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get<User[]>('/api/users');
    //         setUsers(data);
    //     };
    //     fetchUsers();
    // }, []);

    return (
        // 해당 컴포넌트는 브라우저 API를 사용하기 때문에 use client 지시
        <Select.Root>
            <Select.Trigger placeholder="담당자..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                    ;
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
