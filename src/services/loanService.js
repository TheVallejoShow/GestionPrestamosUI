const API_URL = 'http://localhost:5086/api/Loans';

export async function getLoans() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch loans');
  return response.json();
}

export async function requestLoan(loanData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loanData),
  });
  if (!response.ok) throw new Error('Failed to request loan');
  return response.json();
}

export async function updateLoan(id, status) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update loan');
  return response.json();
}