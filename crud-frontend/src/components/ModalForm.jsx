import { useState } from "react";

export default function ModalForm({ isOpen, onClose, mode, onSubmit }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [rate, setRate] = useState("");
    const [status, setStatus] = useState(false);

    const handleStatusChange = (e) => {
        setStatus(e.target.value === "Active");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose(e);
    }

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Client" : "Client Details"}
          </h3>
          <form method="dialog" className="flex flex-col" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => onClose()}
            >
              ✕
            </button>

            <label className="input mb-4 flex items-center gap-2 w-full">
              Name:
              <input type="search" className="grow" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label className="input mb-4 flex items-center gap-2 w-full">
              Email:
              <input type="search" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="input mb-4 flex items-center gap-2 w-full">
              Job:
              <input type="search" className="grow" value={job} onChange={(e) => setJob(e.target.value)} />
            </label>

            <div className="flex mb-4 justify-between">
              <label className="input mr-4 flex items-center">
                Rate:
                <input type="search" className="grow" value={rate} onChange={(e) => setRate(e.target.value)}/>
              </label>
              <select className="select w-full max-w-xs" value={status ? 'Active' : 'Inactive'} onChange={handleStatusChange}>
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>

            <button className="btn btn-success">
              {mode === "edit" ? "Save Changes" : "Add Client"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
