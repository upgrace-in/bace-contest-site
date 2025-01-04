'use client';

import Quiz from '@/components/Quiz';
import { QuizProps, useQuizContext } from '@/context/QuizContext';
import { signOut, useSession } from 'next-auth/react';

export default function Dashboard() {
    const session: any = useSession();
    const { quizes, loading } = useQuizContext();

    const handleLogout = () => {
        signOut();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray space-y-4">
            <div>
                <h1>Welcome <b>{session?.data?.user?.name}</b>!</h1>
            </div>
            {loading?.quizes && <p>Loading quizzes...</p>}
            {!loading?.quizes && quizes?.length === 0 && <p>No quizzes available</p>}
            {
                !loading?.quizes && quizes?.length > 0 && quizes?.map((quiz: QuizProps) => (
                    <Quiz key={quiz.id} {...quiz} />
                ))
            }
            <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
