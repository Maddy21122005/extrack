import { Modal, message } from "antd";
import axios from "axios";
import TransactionForm from "./TransactionForm";

const AddorEditTransactionModal = ({
  showModal,
  setShowModal,
  setLoading,
  getAllTransaction,
  editable,
  setEditable,
}) => {
  const addoreditTransactionSubmit = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      if (editable) {
         console.log("EDIT ID:", editable._id);
        await axios.put(
          `/api/v1/transaction/edit-transaction/${editable._id}`,
          values,
          {
            withCredentials: true,
          },
        );
        message.success("Transaction Updated Successfuly");
      } else {
        await axios.post("/api/v1/transaction/add-transaction", values);
        message.success("Transaction Added Successfuly");
      }

      setLoading(false);
      setShowModal(false);
      getAllTransaction();
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to Add Transaction");
    }
  };
  return (
    <Modal
      title={editable ? "Edit Transaction" : "Add Transaction"}
      open={showModal}
      onCancel={() => {
        setShowModal(false);
        setEditable(null);
      }}
      footer={false}
    >
      <TransactionForm
        onSubmit={addoreditTransactionSubmit}
        initialValues={editable}
        
      />
    </Modal>
  );
};

export default AddorEditTransactionModal;
