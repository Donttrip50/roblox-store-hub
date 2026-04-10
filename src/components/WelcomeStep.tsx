import { useState } from "react";
import { motion } from "framer-motion";
import { User, Users } from "lucide-react";

interface WelcomeStepProps {
  onContinue: (robloxUsername: string, discordUsername: string) => void;
}

const WelcomeStep = ({ onContinue }: WelcomeStepProps) => {
  const [robloxUsername, setRobloxUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-xl font-bold text-foreground mb-1">Welcome</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Enter your usernames to get started with purchasing source access.
      </p>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <User className="w-4 h-4" /> Roblox Username
          </label>
          <input
            type="text"
            placeholder="e.g. RobloxPlayer123"
            value={robloxUsername}
            onChange={(e) => setRobloxUsername(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Users className="w-4 h-4" /> Discord Username
          </label>
          <input
            type="text"
            placeholder="e.g. username"
            value={discordUsername}
            onChange={(e) => setDiscordUsername(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          />
        </motion.div>

        <motion.button
          onClick={() => onContinue(robloxUsername, discordUsername)}
          disabled={!robloxUsername.trim() || !discordUsername.trim()}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeStep;
