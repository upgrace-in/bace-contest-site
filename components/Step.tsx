import { motion } from "framer-motion"

type StepProps = {
    step: number;
    stepOrder: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Step({ step, stepOrder, setStep }: StepProps) {
    const status =
        step === stepOrder ? "active" : step > stepOrder ? "complete" : "inactive";

    return (
        <motion.button
            onClick={() => setStep(stepOrder)}
            initial={false}
            animate={status}
            variants={{
                inactive: {
                    backgroundColor: "#fff"
                },
                active: {
                    backgroundColor: "#fff",
                    borderColor: "#13012d",
                    color: "#13012d"
                },
                complete: {
                    backgroundColor: "#13012d"
                }
            }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 rounded-full border fill-white text-gray-500 grid place-items-center"
        >
            {status === "complete" ? <CheckIcon /> : <span>{stepOrder}</span>}
        </motion.button>
    );
}

function CheckIcon() {
    return (
        <svg
            className="text-white h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 96 960 960"
            stroke="currentColor"
            strokeWidth={80}
        >
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    delay: 0.3,
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.3
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"
            />
        </svg>
    );
}