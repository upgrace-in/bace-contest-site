import dbFunc from '@/utils/dbFunc';
import { NextRequest, NextResponse } from 'next/server';

async function handler(req: NextRequest) {
    try {
        // todo: check if the startDate is reached of the quiz where its linked to
        // todo: remove the answers 
        const body = await req.json()
        const { questionBankID, email } = body

        const data: any = await dbFunc.findViaDocumentID('questions', questionBankID).catch(e => { throw e })
        const user: any = await dbFunc.findViaDocumentID("users", email)

        return NextResponse.json({ ...data, answers: user?.answers || {} })
    } catch (error) {
        console.error('Error checking document:', error);
        return NextResponse.json({ status: false })
    }
}

export { handler as POST }
