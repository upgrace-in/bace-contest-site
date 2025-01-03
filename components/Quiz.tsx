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
            <h2 className="text-xl font-bold text-black">{name}</h2>
            {/* <h3 className="text-sm text-gray-500">Question Bank ID: {questionBankID}</h3> */}
            <div className="mt-4">
                {loading?.questions || loading?.result ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                        <p className="text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <>
                        {quizStatus === 'beforeStart' && <p className="text-blue-500">Starting in: {timeLeft}</p>}
                        {quizStatus === 'afterStart' && <p className="text-green-500">Quiz ends in: {timeLeft}</p>}
                        {quizStatus === 'ended' && <p className="text-red-500">{timeLeft}</p>}

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 mt-4">
                            {/* <button
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                onClick={() => fetchQuestions(questionBankID, id)}
                            >
                                Start Quiz
                            </button> */}
                            {quizStatus === 'afterStart' && (
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                    onClick={() => fetchQuestions(questionBankID, id)}
                                >
                                    Start Quiz
                                </button>
                            )}
                            {quizStatus === 'ended' && (
                                <button
                                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                    onClick={() => downloadResult(id)}
                                >
                                    Download Result
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
