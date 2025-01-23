import { QuizProps, useQuizContext } from '@/context/QuizContext';
import { useEffect, useState } from 'react';

export default function Quiz({ id, name, startDate, endDate, questionBankID }: QuizProps) {
    const { getTimer, fetchQuestions, loading, quizStatus, downloadResult } = useQuizContext();
    const [timeLeft, setTimeLeft] = useState<string>();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(getTimer(startDate, endDate));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startDate, endDate]);

    return (
        <div key={id} className="p-4 rounded shadow bg-white">
            <h2 className="text-2xl font-bold text-[#13012d]">{name}</h2>
            {/* <h3 className="text-sm text-gray-500">Question Bank ID: {questionBankID}</h3> */}
            <div className="mt-2">
                {loading?.questions || loading?.result ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-t-4 border-purple-950 rounded-full animate-spin"></div>
                        <p className="text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <>
                        {quizStatus === 'beforeStart' && <p className="text-blue-600 font-medium">Starting in: {timeLeft}</p>}
                        {quizStatus === 'afterStart' && <p className="text-green-600 font-medium">Quiz ends in: {timeLeft}</p>}
                        {quizStatus === 'ended' && <p className="text-red-600 font-medium">{timeLeft}</p>}

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 mt-4">
                            {quizStatus === 'afterStart' && (
                                <button
                                    className="px-4 py-2 mt-4 bg-purple-950 text-white font-semibold size-full rounded-lg shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-75"
                                    onClick={() => fetchQuestions(questionBankID, id)}
                                >
                                    Start Quiz
                                </button>
                            )}
                            {quizStatus === 'ended' && (
                                <p className="text-gray-700 font-medium">The quiz has been concluded. However, it'll reopen on 1st February 2025 for submission, so if you've missed the chance to submit or participate, please wait for a few days, and then you can participate.</p>
                                // <button
                                //     className="px-4 py-2 mt-4 bg-blue-500 text-white font-semibold size-full rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                //     onClick={() => downloadResult(id)}
                                // >
                                //     Download Result
                                // </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
