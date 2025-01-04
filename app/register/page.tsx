'use client'

import React, { useEffect, useState } from "react";
import Step from "@/components/Step";
import SendRequest from "@/utils/SendRequest";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Register() {
    const router = useRouter()
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState({
        enrollmentID: "",
        contactNumber: "",
        institutionName: "",
        institutionNameOther: "",
        category: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [isPending, setPending] = useState(false)

    const session: any = useSession()

    async function nextStep() {
        if (step === 5) {
            if (!validateFields()) {
                setErrorMessage("Please fill in all required fields.");
                return;
            }
            try {
                setPending(true)
                await SendRequest("/user/add", "POST", formData)
                setErrorMessage("");
                alert("Thank you so much for participating!")
                window.location.href = ''
            } catch (e: any) {
                alert(`Error: ${e.toString()}`);
            } finally {
                setPending(false)
            }
        } else {
            setStep(step + 1)            
        }
    }

    useEffect(() => {
        document.title = "PRAJÑĀ 2025: Register";
        if (session?.data?.isNewUser == false)
            router.push("/dashboard")
    }, [session])

    async function verifyEnrollmentNumber(enrollmentId: string) {
        const res: any = await SendRequest("/enrollment/match", "POST", { enrollmentId }).catch(e => console.log)
        if (!res.data.status) {
            alert("Invalid Enrollment ID")
            setFormData({ ...formData, "enrollmentID": "" })
        }
    }

    function back() {
        if (step > 1) setStep(step - 1);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        if (event.target.name.includes("enrollmentID") && value.length >= 10)
            verifyEnrollmentNumber(value)

        setErrorMessage("")
        setFormData({ ...formData, [name]: value });
    }

    function validateFields() {
        const { enrollmentID, contactNumber, institutionName, category } = formData;
        const isOtherInstitution = institutionName === "Other";
        const institutionIsValid = !isOtherInstitution || formData.institutionNameOther.trim() !== "";

        return enrollmentID.trim() !== "" &&
            contactNumber.trim() !== "" &&
            institutionName.trim() !== "" &&
            institutionIsValid &&
            category.trim() !== "";
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-100">
            <div className="bg-white p-10 rounded-2xl w-max shadow-lg">
                <div className="flex gap-8 justify-center mb-6">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Step key={i} step={step} stepOrder={i + 1} setStep={setStep} />
                    ))}
                </div>

                <div className="space-y-6">
                    {step === 1 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enrollment ID
                            </label>
                            <input
                                type="text"
                                name="enrollmentID"
                                value={formData.enrollmentID}
                                onChange={handleChange}
                                className="p-3 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-purple-950"
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number
                            </label>
                            <input
                                type="number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="p-3 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-purple-950"
                            />
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name of the Institution
                            </label>
                            <select
                                name="institutionName"
                                value={formData.institutionName}
                                onChange={handleChange}
                                className="p-3 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-purple-950"
                            >
                                <option value="">Select Institution</option>
                                <option value="Sharda University">Sharda University</option>
                                <option value="GNIOT">GNIOT</option>
                                <option value="GL - Bajaj">GL - Bajaj</option>
                                <option value="JNU">JNU</option>
                                <option value="NIU">NIU</option>
                                <option value="Innovation Institute">Innovation Institute</option>
                                <option value="GBU">GBU</option>
                                <option value="Nalanda">Nalanda</option>
                                <option value="DU">DU</option>
                                <option value="AIIMS">AIIMS</option>
                                <option value="VMMC - Safdarjung">VMMC - Safdarjung</option>
                                <option value="IIT">IIT</option>
                                <option value="Other">Other</option>
                            </select>
                            {formData.institutionName === "Other" && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Please specify:
                                    </label>
                                    <input
                                        type="text"
                                        name="institutionNameOther"
                                        value={formData.institutionNameOther}
                                        onChange={handleChange}
                                        className="p-3 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-purple-950"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {step === 4 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="p-3 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-purple-950"
                            >
                                <option value="">Select Category</option>
                                <option value="Class 9-12">Class 9-12</option>
                                <option value="College Student">College Student</option>
                            </select>
                        </div>
                    )}
                    {step === 5 && (
                        <div className="text-black">
                            <h2 className="text-lg font-bold text-center mb-4">
                                Review Your Details
                            </h2>
                            <table className="w-full border-collapse border border-gray-400">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Field</th>
                                        <th className="border border-gray-300 px-4 py-2">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Enrollment ID</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.enrollmentID}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Contact Number</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.contactNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Institution Name</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {formData.institutionName === "Other"
                                                ? formData.institutionNameOther
                                                : formData.institutionName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Category</td>
                                        <td className="border border-gray-300 px-4 py-2">{formData.category}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {
                    errorMessage && (
                        <div className="text-red-500 text-center mt-4">
                            {errorMessage}
                        </div>
                    )
                }

                <div className="flex justify-between mt-4">
                    { step > 1 && (
                    <button
                        className="text-gray-700 hover:bg-gray-200 px-8 py-2 rounded-full"
                        onClick={back}
                        disabled={step === 1}
                    >
                        Back
                    </button>)
                    }
                    <button
                        onClick={nextStep}
                        disabled={isPending}
                        className="bg-purple-950 text-white py-2 px-8 rounded-full"
                    >
                        {!isPending ? step === 4 ? "Review" : step === 5 ? "Submit" : "Next" : "Submitting..."}
                    </button>
                </div>
            </div>
        </div>
    );
}
