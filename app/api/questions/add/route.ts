import dbFunc from '@/utils/dbFunc';
import { generateRandomID } from '@/utils/random';
import { NextResponse } from 'next/server';

async function handler() {
    try {
        const questionBankID = generateRandomID("QB");

        await dbFunc.add('questions', questionBankID,
            {
                "questions": [
                    {
                        "question": "What is the capital of France?",
                        "options": ["Berlin", "Madrid", "Paris", "Rome"],
                        "answer": 2
                    },
                    {
                        "question": "Which planet is known as the Red Planet?",
                        "options": ["Earth", "Mars", "Jupiter", "Venus"],
                        "answer": 1
                    },
                    {
                        "question": "What is the largest mammal in the world?",
                        "options": ["Elephant", "Blue Whale", "Giraffe", "Rhino"],
                        "answer": 1
                    },
                    {
                        "question": "Who wrote 'Romeo and Juliet'?",
                        "options": ["William Shakespeare", "Charles Dickens", "Mark Twain", "J.K. Rowling"],
                        "answer": 0
                    },
                    {
                        "question": "What is the chemical symbol for water?",
                        "options": ["H2O", "O2", "CO2", "NaCl"],
                        "answer": 0
                    },
                    {
                        "question": "Which country is famous for the Taj Mahal?",
                        "options": ["India", "China", "Egypt", "Thailand"],
                        "answer": 0
                    },
                    {
                        "question": "What is the hardest natural substance on Earth?",
                        "options": ["Gold", "Diamond", "Iron", "Platinum"],
                        "answer": 1
                    },
                    {
                        "question": "Who discovered penicillin?",
                        "options": ["Alexander Fleming", "Marie Curie", "Albert Einstein", "Isaac Newton"],
                        "answer": 0
                    },
                    {
                        "question": "Which gas do plants primarily use in photosynthesis?",
                        "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                        "answer": 1
                    },
                    {
                        "question": "What is the square root of 64?",
                        "options": ["6", "7", "8", "9"],
                        "answer": 2
                    },
                    {
                        "question": "Who painted the Mona Lisa?",
                        "options": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
                        "answer": 1
                    },
                    {
                        "question": "What is the longest river in the world?",
                        "options": ["Amazon", "Nile", "Yangtze", "Mississippi"],
                        "answer": 1
                    },
                    {
                        "question": "How many continents are there on Earth?",
                        "options": ["5", "6", "7", "8"],
                        "answer": 2
                    },
                    {
                        "question": "Which element has the atomic number 1?",
                        "options": ["Oxygen", "Carbon", "Hydrogen", "Helium"],
                        "answer": 2
                    },
                    {
                        "question": "What is the main ingredient in sushi?",
                        "options": ["Bread", "Rice", "Pasta", "Noodles"],
                        "answer": 1
                    },
                    {
                        "question": "What is the tallest mountain in the world?",
                        "options": ["K2", "Kangchenjunga", "Everest", "Lhotse"],
                        "answer": 2
                    },
                    {
                        "question": "Which language is the most spoken worldwide?",
                        "options": ["English", "Mandarin", "Spanish", "Hindi"],
                        "answer": 1
                    },
                    {
                        "question": "Which sport is known as the 'king of sports'?",
                        "options": ["Basketball", "Cricket", "Football (Soccer)", "Tennis"],
                        "answer": 2
                    },
                    {
                        "question": "Which organ in the human body is responsible for pumping blood?",
                        "options": ["Liver", "Brain", "Heart", "Lungs"],
                        "answer": 2
                    },
                    {
                        "question": "What is the currency of Japan?",
                        "options": ["Dollar", "Euro", "Yen", "Won"],
                        "answer": 2
                    }
                ]
            }).catch(e => { throw e });

        return NextResponse.json({ status: true, questionBankID });
    } catch (error: any) {
        console.error('Error checking document:', error);
        return NextResponse.json({ status: false, error: error?.message });
    }
}

export { handler as GET };
