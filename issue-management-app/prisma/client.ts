import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV === 'production') {
    globalThis.prisma = prisma;
}

// 해당 파일은 최초 생성된 프리즈마 클라이언트 인스턴스 이외에 다른 인스턴스를 생성하지 않도록 보장함
