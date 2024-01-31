'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get<User[]>('/api/users');
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        // 해당 컴포넌트는 브라우저 API를 사용하기 때문에 use client 지시
        <Select.Root>
            <Select.Trigger placeholder="담당자..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map((user) => (
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
