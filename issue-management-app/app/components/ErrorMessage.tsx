import React, { PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

// PropsWithChildren 사용 시, 인터페이스를 직접적으로 정의하는 수고를 덜어줌
const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null; // children이 없을 경우 null 반환 -> 즉, 오류가 있을 때만 동작 처리
    return (
        <Text color="red" as="p">
            {children}
        </Text>
    );
};

export default ErrorMessage;
