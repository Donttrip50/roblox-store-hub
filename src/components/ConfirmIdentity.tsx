import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        // Use roproxy.com as a CORS-friendly proxy for the Roblox API
        const res = await fetch("https://users.roproxy.com/v1/usernames/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usernames: [robloxUsername], excludeBannedUsers: true }),
        });
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setUser(data.data[0]);
        } else {
          setError("User not found on Roblox. Please check the username.");
        }
      } catch {
        setError("Failed to fetch Roblox user. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [robloxUsername]);

  if (loading) {
    return (
      <motion.div
        className="bg-card border border-border rounded-lg p-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-10 h-10 border-2 border-muted-foreground border-t-foreground rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-muted-foreground text-sm mt-4">Looking up your account...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="bg-card border border-border rounded-lg p-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-destructive mb-4">{error}</p>
        <motion.button
          onClick={onGoBack}
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Go Back
        </motion.button>
      </motion.div>
    );
  }

  const avatarUrl = `https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${user!.id}&size=150x150&format=Png&isCircular=false`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="bg-card border border-border rounded-lg p-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <AvatarImage userId={user!.id} url={avatarUrl} displayName={user!.displayName} />

          <motion.h3
            className="text-xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {user!.displayName}
          </motion.h3>
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
          >
            @{user!.name}
          </motion.p>
          <motion.p
            className="text-muted-foreground text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            User ID: {user!.id}
          </motion.p>

          <div className="w-full border-t border-border my-4" />

          <motion.div
            className="w-full space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.3 }}
          >
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Roblox Username</span>
              <span className="text-foreground font-medium">{user!.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discord Username</span>
              <span className="text-foreground font-medium">{discordUsername}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => onConfirm(String(user!.id))}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          Yes, this is me — Continue
        </motion.button>
        <motion.button
          onClick={onGoBack}
          className="w-full bg-secondary text-secondary-foreground font-semibold py-3 rounded-lg transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.3 }}
        >
          Not me — Go Back
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

// Separate component for avatar to handle thumbnail API
const AvatarImage = ({ userId, url, displayName }: { userId: number; url: string; displayName: string }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.data && data.data.length > 0 && data.data[0].imageUrl) {
          setImgSrc(data.data[0].imageUrl);
        }
      } catch {
        // Fallback - use direct Roblox thumbnail
        setImgSrc(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=Png`);
      }
    };
    fetchThumbnail();
  }, [url, userId]);

  return (
    <motion.div
      className="w-28 h-28 rounded-xl border border-border mb-4 overflow-hidden bg-secondary flex items-center justify-center"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={displayName} className="w-full h-full object-cover" />
      ) : (
        <div className="w-8 h-8 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin" />
      )}
    </motion.div>
  );
};

export default ConfirmIdentity;
