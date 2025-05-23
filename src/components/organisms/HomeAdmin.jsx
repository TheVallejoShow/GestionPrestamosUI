import { useState, useEffect } from "react";
import * as loansService from "../../services/loanService";

const mockLoans = [
    { id: 1, userEmail: "usuario@test.com", amount: 1000, status: "Pendiente" },
    { id: 2, userEmail: "usuario2@test.com", amount: 500, status: "Aprobado" },
    { id: 3, userEmail: "usuario3@test.com", amount: 200, status: "Rechazado" },
];

export default function HomeAdmin() {
    const [loans, setLoans] = useState(mockLoans);

    useEffect(() => {
        loansService
            .getLoans()
            .then((data) => {
                if (data.length > 0) setLoans(data);
                else console.log("No loan requests found.");
            })
            .catch((err) => {
                console.error("Error fetching loans:", err);
            });
    }, []);

    async function handleUpdateStatus(id, newStatus) {
        try {
            await loansService.updateLoan(id, newStatus);
            setLoans(prev =>
                prev.map(loan => (loan.id === id ? { ...loan, status: newStatus } : loan))
            );
        } catch (error) {
            console.error(`Failed to update loan status to ${newStatus} for id ${id}:`, error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Loan Management</h2>
            {loans.length === 0 ? (
                <p>No loan requests available.</p>
            ) : (
                <ul>
                    {loans.map(({ id, userEmail, amount, status }) => (
                        <li
                            key={id}
                            className="border-b py-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
                        >
                            <div>
                                <p>
                                    <strong>User:</strong> {userEmail}
                                </p>
                                <p>
                                    <strong>Amount:</strong> ${amount.toFixed(2)}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`font-semibold ${status === "Aprobado"
                                                ? "text-green-600"
                                                : status === "Rechazado"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                            }`}
                                    >
                                        {status}
                                    </span>
                                </p>
                            </div>

                            {status === "Pendiente" && (
                                <div className="mt-3 sm:mt-0 space-x-2">
                                    <button onClick={() => handleUpdateStatus(id, "Aprobado")}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Aprobar</button>

                                    <button onClick={() => handleUpdateStatus(id, "Rechazado")}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Rechazar</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}