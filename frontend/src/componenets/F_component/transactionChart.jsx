import React, { useState, useEffect } from "react";
import axios from "axios";
import { XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';

const TransactionChart = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8500/transaction/getTransaction");
        const transactions = response.data;

        console.log("Fetched Transactions:", transactions);

        const formattedData = transactions.map(transaction => ({
          x: new Date(transaction.date), // Use the Date object directly
          y: transaction.amount,
          type: transaction.type
        }));

        console.log("Formatted Data:", formattedData);

        setTransactionData(formattedData);
        setError(null); // Reset error state if fetching is successful
      } catch (error) {
        console.error("Error fetching transactions:", error.response ? error.response.data.error : error.message);
        setError(error.response ? error.response.data.error : error.message); // Set error message
      }
    };

    fetchTransactions();
  }, []);

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Error Fetching Transactions</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Transaction Chart</h2>
      <div style={{ height: "400px", width: "100%" }}>
        <XYPlot xType="time" height={400} width={800} margin={{ left: 60, right: 60 }}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis 
  title="Date" 
  tickFormat={v => new Date(v).toLocaleDateString()} 
  tickLabelAngle={90} // Add this line
/>

          <YAxis title="Amount" />
          <LineSeries
  data={transactionData.filter(transaction => transaction.type === 'income')}
  curve={'curveMonotoneX'}
  color="green"
  strokeStyle="solid"
  style={{ fill: 'none' }} // Set fill to none using style prop
/>
<LineSeries
  data={transactionData.filter(transaction => transaction.type === 'expense')}
  curve={'curveMonotoneX'}
  color="red"
  strokeStyle="solid"
  style={{ fill: 'none' }} // Set fill to none using style prop
/>

        </XYPlot>
      </div>
    </div>
  );
};

export default TransactionChart;
