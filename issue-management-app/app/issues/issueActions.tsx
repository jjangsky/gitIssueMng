import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const issueActions = () => {
    // 이슈 생성 버튼 컴포넌트
    return (
        <div className="mb-5">
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    );
};

export default issueActions;
