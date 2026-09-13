import React, { useState, useEffect, useMemo } from "react";
import { Modal, Input, Select, message, Table, DatePicker, Button } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import api from "../api";
import Spinner from "../components/Layout/Spinner";
import AddorEditTransactionModal from "../components/Layout/AddorEditTransactionModal";
import dayjs from "dayjs";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [customRange, setCustomRange] = useState([]);
  const [dateType, setDateType] = useState("all");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setallTransaction] = useState([]);
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // derived list of categories
  const categoryFilters = useMemo(
    () =>
      [...new Set(allTransaction.map((t) => t.category || "Other"))].map(
        (cat) => ({
          text: cat,
          value: cat,
        }),
      ),
    [allTransaction],
  );

  const clearAllFilters = () => {
    setDateType("all");
    setType("");
    setCategory("");
    setMinAmount("");
    setMaxAmount("");
    setCustomRange([]);
  };

  // Totals for summary cards
  const totals = useMemo(() => {
    let income = 0,
      expense = 0;
    allTransaction.forEach((t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") income += amt;
      else expense += amt;
    });
    return { income, expense, balance: income - expense };
  }, [allTransaction]);

  // columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => dayjs(text).format("DD MMM YYYY"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      width: 140,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amt) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(amt || 0),
      width: 140,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (t) => (
        <span className={`type-pill ${t === "income" ? "income" : "expense"}`}>
          {t}
        </span>
      ),
      width: 120,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 200,
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", gap: 12 }}>
            <EditOutlined
              style={{ color: "#16a34a", cursor: "pointer", fontSize: 16 }}
              onClick={() => {
                setEditable(record);
                setShowModal(true);
              }}
            />
            <DeleteOutlined
              style={{ color: "#ef4444", cursor: "pointer", fontSize: 16 }}
              onClick={() => handleDelete(record)}
            />
          </div>
        );
      },
      width: 120,
      align: "center",
    },
  ];

  // fetch transactions
  const getAllTransaction = async () => {
    try {
      setLoading(true);
      const params = {
        dateType,
        type,
        category,
        minAmount,
        maxAmount,
      };

      if (dateType === "custom" && customRange.length === 2) {
        params.startDate = customRange[0].toISOString();
        params.endDate = customRange[1].toISOString();
      }

      const result = await api.get("/api/v1/transaction/all-transaction", {
        params,
        withCredentials: true,
      });

      setallTransaction(result.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Fetch Issue with Transaction");
    }
  };

  useEffect(() => {
    getAllTransaction();
    // eslint-disable-next-line
  }, [dateType, type, category, minAmount, maxAmount, customRange]);

  // delete transaction
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This transaction will be permanently deleted.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setLoading(true);
          await api.delete(
            `/api/v1/transaction/delete-transaction/${record._id}`,
            { withCredentials: true },
          );
          message.success("Transaction Deleted Successfully");
          setEditable(null);
          getAllTransaction();
          setLoading(false);
        } catch (error) {
          setLoading(false);
          message.error("Unable to Delete Transaction");
        }
      },
    });
  };

  return (
    <Layout>
      {loading && <Spinner />}

      {/* top icons */}
      <div className="top-icons" role="toolbar" aria-label="view-toggle">
        <UnorderedListOutlined
          className={viewData === "table" ? "icon-active" : ""}
          onClick={() => setViewData("table")}
        />
        <AreaChartOutlined
          className={viewData === "analytics" ? "icon-active" : ""}
          onClick={() => setViewData("analytics")}
        />
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-row">
        <div className="summary-card">
          <div className="summary-title">Total Income</div>
          <div className="summary-value income">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(totals.income)}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-title">Total Expense</div>
          <div className="summary-value expense">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(totals.expense)}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-title">Balance</div>
          <div
            className={`summary-value ${totals.balance >= 0 ? "income" : "expense"}`}
          >
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(totals.balance)}
          </div>
        </div>
      </div>

      {/* FILTERS LINE */}
      <div className="filters-line">
        <div className="filters-left">
          <Select
            value={dateType}
            onChange={(v) => setDateType(v)}
            style={{ width: 120 }}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="today">Today</Select.Option>
            <Select.Option value="week">Week</Select.Option>
            <Select.Option value="month">Month</Select.Option>
            <Select.Option value="year">Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {dateType === "custom" && (
            <RangePicker onChange={(values) => setCustomRange(values)} />
          )}

          <Select
            placeholder="Type"
            allowClear
            style={{ width: 130 }}
            onChange={(v) => setType(v)}
          >
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>

          <Select
            placeholder="Category"
            allowClear
            style={{ width: 150 }}
            onChange={(v) => setCategory(v)}
          >
            {categoryFilters.map((c) => (
              <Select.Option key={c.value} value={c.value}>
                {c.text}
              </Select.Option>
            ))}
          </Select>

          <Input
            placeholder="Min"
            type="number"
            style={{ width: 110 }}
            onChange={(e) => setMinAmount(e.target.value)}
          />

          <Input
            placeholder="Max"
            type="number"
            style={{ width: 110 }}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </div>

        <div className="filters-right">
          <Button className="btn-clear" onClick={clearAllFilters}>
            Clear
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setEditable(null);
              setShowModal(true);
            }}
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {/* TABLE / ANALYTICS */}
      <div className="table-card">
        {viewData === "table" ? (
          <Table
            dataSource={allTransaction}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 8 }}
            scroll={{ y: "55vh" }}
          />
        ) : (
          <Analytics dataSource={allTransaction} />
        )}
      </div>

      <AddorEditTransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        setLoading={setLoading}
        getAllTransaction={getAllTransaction}
        editable={editable}
        setEditable={setEditable}
      />
    </Layout>
  );
};

export default HomePage;
