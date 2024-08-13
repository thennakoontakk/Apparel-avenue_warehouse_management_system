import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css"; 

function TransactionSummary() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    fetchTransactionSummary();
  }, []);

  const fetchTransactionSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8500/transaction/getTransaction"
      );
      const transactions = response.data;

      // Calculate total income, total expense, and balance
      let totalIncome = 0;
      let totalExpense = 0;
      transactions.forEach((transaction) => {
        if (transaction.type === "income") {
          totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
          totalExpense += transaction.amount;
        }
      });
      const balance = totalIncome - totalExpense;

      // Set the summary state
      setSummary({
        totalIncome,
        totalExpense,
        balance,
      });
    } catch (error) {
      console.error("Error fetching transaction summary:", error);
    }
  };

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h2>Total Income</h2>
        <p className="summary-value">{summary.totalIncome}</p>
      </div>
      <div className="summary-card">
        <h2>Total Expense</h2>
        <p className="summary-value">{summary.totalExpense}</p>
      </div>
      <div className="summary-card">
        <h2>Balance</h2>
        <p className="summary-value">{summary.balance}</p>
      </div>
    </div>
  );
}

export default TransactionSummary;
