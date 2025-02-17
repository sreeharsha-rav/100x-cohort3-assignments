import { useState } from "react";
import { FormData } from "./types";
import Header from "./components/Header";
import AdoptionForm from "./components/AdoptionForm/AdoptionForm";
import ApplicationsTable from "./components/ApplicationsTable";

function App() {
  const [applications, setApplications] = useState<FormData[]>([]);

  const handleSubmit = (formData: FormData) => {
    setApplications((prev) => [...prev, formData]);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <AdoptionForm onSubmit={handleSubmit} />
        <ApplicationsTable applications={applications} />
      </div>
    </div>
  );
}

export default App;
