import { useState } from "react";
import { OWNER_KEY } from "@/lib/store";
import { Shield, KeyRound } from "lucide-react";

interface OwnerLoginProps {
  onLogin: () => void;
}

const OwnerLogin = ({ onLogin }: OwnerLoginProps) => {
  const [username, setUsername] = useState("");
  const [discord, setDiscord] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "S_Vi2eR" && discord === "Immortal Owner" && key === OWNER_KEY) {
      onLogin();
    } else {
      setError("Invalid credentials or key.");
    }
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4">
            <Shield className="w-7 h-7 text-foreground" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Owner Panel</h1>
          <p className="text-muted-foreground text-sm">Authorized access only</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Roblox Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Discord Username</label>
            <input
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Discord"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
              <KeyRound className="w-4 h-4" /> Access Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Enter your key"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
