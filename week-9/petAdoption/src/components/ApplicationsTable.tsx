import { FormData } from "../types";

interface ApplicationsTableProps {
  applications: FormData[];
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
}) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">Submitted Applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Pet Type</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index}>
                <td>{app.fullName}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{app.petType}</td>
                <td>{app.preferredSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ApplicationsTable;
