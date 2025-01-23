'use client';
import UserDataDisplayComponent from '@/components/UserDataDisplayComponent';
import SendRequest from '@/utils/SendRequest';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {

    const session: any = useSession();
    const [loading, setLoading] = useState<any>();
    const [data, setData] = useState<any>()

    const fetchAllUserData = async () => {
        setLoading(true)
        try {
            const res: any = await SendRequest('/user/getAll', 'GET');

            if (!res.data) throw res.data?.error

            setData(res.data.data)
        } catch (error: any) {
            alert(error.toString())
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }

    useEffect(() => {
        fetchAllUserData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray space-y-4">
            <div className='mb-8'>
                {loading && <p>Loading user data...</p>}
                {!loading && <UserDataDisplayComponent data={data} />}
            </div>
        </div>
    );
}