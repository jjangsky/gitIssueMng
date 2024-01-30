export { default } from 'next-auth/middleware';

export const config = {
    // 익명 사용자가 생성, 수정 불가능하도록 설정
    // +는 1개 이상의 문자를 의미
    matcher: ['/issues/new', '/issues/:id+/edit'],
};
