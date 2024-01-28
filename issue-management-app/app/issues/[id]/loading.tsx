import { Heading, Flex, Card, Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const LoadingIssueDetailPage = () => {
    return (
        <Box>
            <Skeleton />
            <Flex my="2" className="space-x-3">
                <Skeleton width="5rem" />
                <Skeleton width="5rem" />
            </Flex>
            <Card className="prose" mt="4">
                <Skeleton count={3} />
            </Card>
        </Box>
    );
};

export default LoadingIssueDetailPage;
