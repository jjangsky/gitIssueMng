'use client';
import { Button, TextField, TextArea, Callout } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import 'easymde/dist/easymde.min.css';
import React, { use, useState } from 'react';
import axios from 'axios';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    // 해당 함수는 input 태그에 입력된 데이터 변경 사항 추정 및 제출에 사용
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();
    const [error, setError] = useState('');
    console.log(register('title'));

    return (
        <div className="max-w-xl">
            {error && ( // 오류가 발생했을 때, 에러 메시지 출력 -> state 사용하여 리렌더링
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}

            <form
                className="max-w-xl space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setError('예상치 못한 오류 발생');
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                    {/* 스프레드 문법을 사용 -> register에 다수의 프로퍼티가 존재  */}
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                    // render 프로퍼티의 콜백함수의 인자는 앞서 정의한 Register 함수가 리턴하는 객체와 동일한 형태
                />
                <Button>Create New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
