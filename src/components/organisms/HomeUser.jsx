import { useState, useEffect } from "react";
import * as loansService from "../../services/loanService";

const exampleLoans = [
  { id: 1, amount: 1000, status: "Pendiente", userEmail: "demo@example.com" },
  { id: 2, amount: 500, status: "Aprobado", userEmail: "demo@example.com" },
];

export default function HomeUser({ userEmail }) {
  const [amount, setAmount] = useState("");
  const [loans, setLoans] = useState(exampleLoans);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    loansService
      .getLoans()
      .then((allLoans) => {
        const userLoans = allLoans.filter((loan) => loan.userEmail === userEmail);
        if (userLoans.length > 0) {
          setLoans(userLoans);
        } else {
          console.log("No loans found for user");
        }
      })
      .catch((err) => {
        console.error("Error fetching loans:", err);
      });
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const newLoanData = {
        userEmail,
        amount: numericAmount,
        status: "Pendiente",
      };

      const createdLoan = await loansService.requestLoan(newLoanData);
      setLoans([...loans, createdLoan]);
      setAmount("");
    } catch (err) {
      console.error("Error creating loan:", err);
      setError("Failed to request loan");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Request Loan</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="number"
          placeholder="Amount to request"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Request
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">My Loans</h3>
      {loans.length === 0 ? (
        <p>You have no loan requests.</p>
      ) : (
        <ul>
          {loans.map(({ id, amount, status }) => (
            <li key={id} className="border-b py-2 flex justify-between">
              <span>Amount: ${amount.toFixed(2)}</span>
              <span
                className={`font-semibold ${
                  status === "Aprobado"
                    ? "text-green-600"
                    : status === "Rechazado"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}