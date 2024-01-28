import exp from 'constants';
import { z } from 'zod';

const issueSchema = z.object({
    title: z.string().min(1, '제목을 입력해 주세요').max(255), // 두번째 인자로 오류메시지 설정 가느
    description: z.string().min(1, '내용을 입력해 주세요.'),
});

export { issueSchema };
