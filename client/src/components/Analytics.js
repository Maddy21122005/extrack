import React from "react";
import dayjs from "dayjs";
import PieChart from "./Layout/PieChart";
import LineChart from "./Layout/LineChart";

const Analytics = ({ dataSource }) => {
  //Card 1
  const totalTransaction = dataSource.length;
  const totalIncomeTransaction = dataSource.filter(
    (transaction) => transaction.type === "income",
  ).length;
  const totalExpenseTransaction = totalTransaction - totalIncomeTransaction;
  const totalIncomePercent = (totalIncomeTransaction / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction / totalTransaction) * 100;

  //Card 2 (Category Wise)
  let totalSpending = 0;
  const categoryMap = {};

  dataSource.forEach((transaction) => {
    const category = transaction.category;

    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }
    totalSpending += transaction.amount;
    categoryMap[category] += transaction.amount;
  });

  const categoryPieData = Object.keys(categoryMap).map((cat) => ({
    type: cat,
    value: categoryMap[cat],
  }));

  //Card 3
  const monthlyTotals = {};

  // 1. Group by YYYY-MM (sortable key)
  dataSource.forEach((t) => {
    const key = dayjs(t.date).format("YYYY-MM");

    if (!monthlyTotals[key]) {
      monthlyTotals[key] = 0;
    }

    monthlyTotals[key] += t.amount;
  });

  // 2. Convert to array + SORT
  const monthlyLineData = Object.keys(monthlyTotals)
    .sort() // YYYY-MM sorts naturally
    .map((key) => ({
      month: dayjs(key).format("MMM YYYY"),
      amount: monthlyTotals[key],
    }));

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              TotalTransaction : {totalTransaction}
            </div>
            <div className="card-body">
              <PieChart
                data={[
                  { type: "Income %", value: totalIncomePercent },
                  { type: "Expense %", value: totalExpensePercent },
                ]}
                width={300}
                height={300}
                radius={0.9}
                innerRadius={0.6}
                legend={{ position: "bottom" }}
                tooltip={{
                  formatter: (datum) => ({
                    name: datum.type,
                    value: `${(datum.percent * 100).toFixed(1)}%`,
                  }),
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Category Wise Spending:₹ {totalSpending.toLocaleString()}
            </div>
            <div className="card-body">
              <PieChart
                data={categoryPieData}
                width={300}
                height={300}
                radius={0.9}
                innerRadius={0.6}
                legend={{ position: "bottom" }}
                tooltip={{
                  formatter: (datum) => {
                    if (!datum) return { name: "", value: "" };
                    return {
                      name: datum.type,
                      value: `₹ ${datum.value}`,
                    };
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Monthly Spending</div>
            <div className="card-body">
              <LineChart
                data={monthlyLineData}
                xField="month"
                yField="amount"
                width={300}
                height={300}
                color="#2563eb"
                tooltip={{
                  formatter: (datum) => ({
                    name: datum.month,
                    value: `₹ ${datum.amount}`,
                  }),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
