import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.div
            className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
          >
            <Shield className="w-7 h-7 text-foreground" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-foreground">Owner Panel</h1>
          <p className="text-muted-foreground text-sm">Authorized access only</p>
        </motion.div>

        <motion.div
          className="bg-card border border-border rounded-lg p-6 space-y-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          {error && (
            <motion.p
              className="text-destructive text-sm text-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.p>
          )}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Roblox Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Discord Username</label>
            <input
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
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
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
              placeholder="Enter your key"
            />
          </div>
          <motion.button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OwnerLogin;
