import { useState } from "react";
import { User, Users } from "lucide-react";

interface WelcomeStepProps {
  onContinue: (robloxUsername: string, discordUsername: string) => void;
}

const WelcomeStep = ({ onContinue }: WelcomeStepProps) => {
  const [robloxUsername, setRobloxUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-1">Welcome</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Enter your usernames to get started with purchasing source access.
      </p>

      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <User className="w-4 h-4" /> Roblox Username
          </label>
          <input
            type="text"
            placeholder="e.g. RobloxPlayer123"
            value={robloxUsername}
            onChange={(e) => setRobloxUsername(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Users className="w-4 h-4" /> Discord Username
          </label>
          <input
            type="text"
            placeholder="e.g. username"
            value={discordUsername}
            onChange={(e) => setDiscordUsername(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <button
          onClick={() => onContinue(robloxUsername, discordUsername)}
          disabled={!robloxUsername.trim() || !discordUsername.trim()}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;
