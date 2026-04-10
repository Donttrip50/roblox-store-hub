import { useEffect, useState } from "react";

interface RobloxUser {
  id: number;
  name: string;
  displayName: string;
}

interface ConfirmIdentityProps {
  robloxUsername: string;
  discordUsername: string;
  onConfirm: (userId: string) => void;
  onGoBack: () => void;
}

const ConfirmIdentity = ({ robloxUsername, discordUsername, onConfirm, onGoBack }: ConfirmIdentityProps) => {
  const [user, setUser] = useState<RobloxUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://users.roblox.com/v1/usernames/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usernames: [robloxUsername], excludeBannedUsers: true }),
        });
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setUser(data.data[0]);
        } else {
          setError("User not found on Roblox.");
        }
      } catch {
        setError("Failed to fetch Roblox user.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [robloxUsername]);

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <p className="text-destructive mb-4">{error}</p>
        <button onClick={onGoBack} className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:opacity-80 transition">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center">
        <img
          src={`https://www.roblox.com/headshot-thumbnail/image?userId=${user!.id}&width=150&height=150&format=Png`}
          alt={user!.displayName}
          className="w-28 h-28 rounded-xl border border-border mb-4"
        />
        <h3 className="text-xl font-bold text-foreground">{user!.displayName}</h3>
        <p className="text-muted-foreground text-sm">@{user!.name}</p>
        <p className="text-muted-foreground text-xs">User ID: {user!.id}</p>

        <div className="w-full border-t border-border my-4" />

        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Roblox Username</span>
            <span className="text-foreground font-medium">{user!.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discord Username</span>
            <span className="text-foreground font-medium">{discordUsername}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onConfirm(String(user!.id))}
        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition"
      >
        Yes, this is me — Continue
      </button>
      <button
        onClick={onGoBack}
        className="w-full bg-secondary text-secondary-foreground font-semibold py-3 rounded-lg hover:opacity-80 transition"
      >
        Not me — Go Back
      </button>
    </div>
  );
};

export default ConfirmIdentity;
