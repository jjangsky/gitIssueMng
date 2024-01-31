import prsima from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const users = await prsima?.user.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return NextResponse.json(users);
}
