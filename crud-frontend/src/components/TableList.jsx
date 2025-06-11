import axios from "axios";
import { useState, useEffect } from "react";

export default function TableList({ handleOpen, searchTerm, refresh, onRefresh }) {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clients');
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [refresh]);

  const filteredData = tableData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    try {
      if (confirmDelete) {
        await axios.delete(`http://localhost:3000/api/clients/${id}`);
        setTableData(prevData => prevData.filter(client => client.id !== id));
        // refresh the table data
        onRefresh();
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("Failed to delete client");
    }
  }

  return (
    <>
      {error && (
        <div className="alert alert-error shadow-lg mt-8">
          <div>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-8 p-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>I.D</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
              <th className="flex">Actions</th>
            </tr>
          </thead>
          {/* body */}
          <tbody
            className="hover"
          >
            {filteredData.map((client) => (
              <tr key={client.id}>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>
                  <button
                    className={`btn rounded-full w-24 ${client.isactive
                        ? `btn-primary`
                        : `btn-outline btn-primary`
                      }`}
                  >
                    {client.isactive ? `Active` : `Inactive`}
                  </button>
                </td>
                <td>
                  {/* edit/update button */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpen('edit', client)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-accent"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
