import { useState } from "react";
import OwnerLogin from "@/components/OwnerLogin";
import OwnerDashboard from "@/components/OwnerDashboard";

const OwnerPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <OwnerLogin onLogin={() => setAuthenticated(true)} />;
  }

  return <OwnerDashboard onLogout={() => setAuthenticated(false)} />;
};

export default OwnerPanel;
