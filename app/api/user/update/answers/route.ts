import dbFunc from '@/utils/dbFunc';
import { NextRequest, NextResponse } from 'next/server';

async function handler(req: NextRequest) {
    try {
        const body = await req.json()
        const { answers, email } = body

        await dbFunc.updateByDocumentID('users', email, { "answers": answers }).catch(e => { throw e })

        return NextResponse.json({ status: true })
    } catch (error) {
        console.error('Error checking document:', error);
        return NextResponse.json({ status: false })
    }
}

export { handler as POST }
