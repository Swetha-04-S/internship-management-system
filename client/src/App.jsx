import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.message);
      })
      .catch(() => {
        setBackendStatus("❌ Backend connection failed");
      });
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "12px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {backendStatus}
      </div>

      <AppRoutes />
    </>
  );
}

export default App;