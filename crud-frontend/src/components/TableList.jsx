export default function TableList({handleOpen}) {
  const clients = [
    {
      id: 1,
      name: "Matthew McConaughey",
      email: "mcconaughey@gmail.com",
      job: "Quality Control Specialist",
      rate: 10000,
      isActive: true,
    },
    {
      id: 2,
      name: "Anne Hathaway",
      email: "hathaway@gmail.com",
      job: "Desktop Support Technician",
      rate: 5000,
      isActive: false,
    },
    {
      id: 3,
      name: "Jessica Chastain",
      email: "chastain@gmail.com",
      job: "Tax Accountant",
      rate: 2500,
      isActive: true,
    },
  ];

  return (
    <>
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
            </tr>
          </thead>
          {/* body */}
          <tbody className="hover">
            {clients.map((client) => (
              <tr key={client.id}>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>
                  <button
                    className={`btn rounded-full w-24 ${
                      client.isActive
                        ? `btn-primary`
                        : `btn-outline btn-primary`
                    }`}
                  >
                    {client.isActive ? `Active` : `Inactive`}
                  </button>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleOpen('edit')} >Update</button>
                </td>
                <td>
                  <button className="btn btn-accent">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
