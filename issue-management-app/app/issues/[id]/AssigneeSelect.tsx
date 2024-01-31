'use client';
import { Select } from '@radix-ui/themes';
import React from 'react';

const AssigneeSelect = () => {
    return (
        // 해당 컴포넌트는 브라우저 API를 사용하기 때문에 use client 지시
        <Select.Root>
            <Select.Trigger placeholder="담당자..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="1">김철수</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
