import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import TableList from "./components/Tablelist";
import ModalForm from "./components/ModalForm";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [modalMode, setmodalMode] = useState('add');

  const handleOpen = (mode) => {
    setIsOpen(true);
    setmodalMode(mode);
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      console.log("modal mode Add");
    } else {
      console.log("modal mode Edit");
    }
  };

  return ( 
    <>
      <NavBar onOpen={() => handleOpen('add')} />
      <TableList handleOpen={handleOpen} />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
      />
    </>
  );
}

export default App;
