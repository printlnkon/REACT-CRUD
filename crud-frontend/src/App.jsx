import "./App.css";
import { use, useState } from "react";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setmodalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setmodalMode(mode);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log("Client added:", response.data);
        setRefresh(prev => prev + 1);
      } catch (error) {
        console.error("Error adding client:", error);
        throw error;
      }
    } else {
      console.log("Updating client data:", newClientData);
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log("Client updated:", response.data);
        setRefresh(prev => prev + 1);
      } catch (error) {
        console.error("Error updating client:", error);
        throw error;
      }
    }
  };

  const handleRefresh = () => {
    setRefresh(prev => prev + 1);
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList
        handleOpen={handleOpen}
        searchTerm={searchTerm}
        refresh={refresh}
        onRefresh={handleRefresh}
      />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode} clientData={clientData}
      />
    </>
  );
}

export default App;