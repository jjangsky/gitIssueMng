'use client';
import { Button, TextField, TextArea, Callout, Text } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
// import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import 'easymde/dist/easymde.min.css';
import React, { use, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { ErrorMessage } from '@/app/components/index';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>;
// 원래는 클라이언트에서도 type 체크를 위해 객체의 interface를 정의해야 하지만
// 객체 필드 변경 시, 클라이언트와 서버 양 측에 선언된 interface를 모두 변경해야 하는 번거로움이 존재
// 이를 해결하기 위해 zod 라이브러리를 사용하여 type 체크를 진행

const IssueForm = ({ issue }: { issue?: Issue }) => {
    // 해당 함수는 input 태그에 입력된 데이터 변경 사항 추정 및 제출에 사용
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    });
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSibmitting, setIsSubmitting] = useState(false); // 제출 버튼 클릭 시, 로딩 표시를 위한 state
    console.log(register('title'));

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            if (issue) {
                // 인자값 존재하면 수정
                await axios.patch(`/api/issues/${issue.id}`, data);
            } else {
                // 존재하지 않으면 생성
                await axios.post('/api/issues', data);
            }
            router.push('/issues/list');
            router.refresh(); // 캐시 초기화
        } catch (error) {
            setIsSubmitting(false);
            setError('예상치 못한 오류 발생');
        }
    });

    return (
        <div className="max-w-xl">
            {error && ( // (서버측)오류가 발생했을 때, 에러 메시지 출력 -> state 사용하여 리렌더링
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}

            <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        defaultValue={issue?.title}
                        placeholder="Title"
                        {...register('title')}
                    />
                    {/* 스프레드 문법을 사용 -> register에 다수의 프로퍼티가 존재  */}
                </TextField.Root>
                {/*클라이언트측 에러 발생 시, 에러 메시지 출력, 에러 메세지 컴포넌트 재사용 */}
                <ErrorMessage>{errors?.title?.message}</ErrorMessage>
                <Controller
                    defaultValue={issue?.description}
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                    // render 프로퍼티의 콜백함수의 인자는 앞서 정의한 Register 함수가 리턴하는 객체와 동일한 형태
                />
                <ErrorMessage>{errors?.description?.message}</ErrorMessage>
                <Button disabled={isSibmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}
                    {isSibmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
