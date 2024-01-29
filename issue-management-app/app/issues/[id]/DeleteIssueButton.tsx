'use client';
import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    // page 이동을 위한 router 객체
    const router = useRouter();
    const [error, setError] = useState(false); // 에러 처리를 위한 state
    const [isDeleting, setIsDeleting] = useState(false); // 삭제 처리를 위한 state, 삭제 중복처리 방지

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.post('/api/issues/' + issueId);
            router.push('/issues');
            router.refresh(); // 캐시 삭제
        } catch (e) {
            console.log('error');
            setIsDeleting(false);
            console.error(e);
            setError(true);
        }
    };

    // AlertDialog는 브라우저 API를 사용하기 때문에 Client 컴포넌트로 전환 필요
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isDeleting}>
                        Delete Button {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description> 정말 삭제하시길 원합니까?</AlertDialog.Description>
                    <Flex mt="4" gap="3">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button onClick={onDelete} color="red">
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>이슈 삭제 오류 발생.</AlertDialog.Description>
                    <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
                        확인
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteIssueButton;
