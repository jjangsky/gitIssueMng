'use client';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        // 새로운 파라미터를 생성하는 형식이 아닌 기존의 파라미터에 값을 추가하는 형식
        // 쿼리 param을 유지하면서 새로운 param을 추가하는 방식
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString);
    };

    return (
        <Flex align="center" gap="2">
            <Text>
                Page {currentPage} of {pageCount}
            </Text>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => {
                    changePage(1);
                }}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => {
                    changePage(currentPage - 1);
                }}
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => {
                    changePage(currentPage + 1);
                }}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => {
                    changePage(pageCount);
                }}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    );
};

export default Pagination;
