'use client';
import { Button, TextField, TextArea } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import 'easymde/dist/easymde.min.css';
import React, { use } from 'react';
import axios from 'axios';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    // 해당 함수는 input 태그에 입력된 데이터 변경 사항 추정 및 제출에 사용
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();
    console.log(register('title'));

    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data);
                router.push('/issues');
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
    );
};

export default NewIssuePage;
