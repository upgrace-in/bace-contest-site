import dbFunc from '@/utils/dbFunc';
import { NextResponse } from 'next/server';

async function handler() {
    try {
        const data = await dbFunc.findAllDocs('users').catch(e => { throw e })
        return NextResponse.json({ status: true, data })
    } catch (error) {
        console.error('Error checking document:', error);
        return NextResponse.json({ status: false })
    }
}

export { handler as GET }
