import dbFunc from '@/utils/dbFunc';
import { NextRequest, NextResponse } from 'next/server';

async function handler(req: NextRequest) {
    try {
        const body = await req.json()
        const { enrollmentId } = body
        const data: any = await dbFunc.findViaDocumentID('enrollmentIDs', enrollmentId).catch(e => { throw e })
        return NextResponse.json({ status: data.expire == true ? false : true })
    } catch (error) {
        console.error('Error checking document:', error);
        return NextResponse.json({ status: false })
    }
}

export { handler as POST }
