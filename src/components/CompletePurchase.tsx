import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { type Package, getSettings, addBuyerLog, sendDiscordWebhook } from "@/lib/store";

interface CompletePurchaseProps {
  pkg: Package;
  robloxUsername: string;
  discordUsername: string;
  robloxUserId: string;
  onComplete: () => void;
  onBack: () => void;
}

const CompletePurchase = ({ pkg, robloxUsername, discordUsername, robloxUserId, onComplete, onBack }: CompletePurchaseProps) => {
  const settings = getSettings();

  const handleComplete = () => {
    const log = {
      id: Date.now().toString(),
      robloxUsername,
      discordUsername,
      robloxUserId,
      packageName: pkg.name,
      price: pkg.price,
      timestamp: new Date().toISOString(),
    };
    addBuyerLog(log);
    sendDiscordWebhook(settings.discordWebhookUrl, robloxUsername, discordUsername, pkg.name, pkg.price);
    onComplete();
  };

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6 space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="bg-secondary rounded-lg p-4 flex justify-between items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <div>
          <p className="text-xs text-muted-foreground">Selected package</p>
          <p className="font-bold text-foreground">{pkg.name}</p>
          <p className="text-xs text-muted-foreground">{pkg.duration} of access</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-2xl font-bold text-foreground">{pkg.price} R$</p>
        </div>
      </motion.div>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">1</span>
            <span className="font-semibold text-foreground">Buy the Game Pass</span>
          </div>
          <motion.a
            href={settings.gamepassLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" /> Open Game Pass on Roblox
          </motion.a>
          <p className="text-sm text-muted-foreground mt-2">
            Opens Roblox — click <span className="text-foreground font-medium">Buy</span> to purchase for {pkg.price} R$
          </p>
          <div className="border-l-2 border-border ml-3 mt-2 pl-4">
            <p className="text-sm text-muted-foreground italic">after purchasing the game pass</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">2</span>
            <span className="font-semibold text-foreground">Open a Discord Ticket</span>
          </div>
          <motion.a
            href={settings.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[hsl(235,86%,65%)] text-foreground font-semibold py-3 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🎮 {settings.discordLink.replace("https://", "")}
          </motion.a>
          <p className="text-sm text-muted-foreground mt-2">
            Include your Roblox username <span className="text-foreground font-medium">({robloxUsername})</span> as proof of purchase.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="border-t border-border pt-4 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}
      >
        <motion.button
          onClick={handleComplete}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          I've completed the purchase
        </motion.button>
        <motion.button
          onClick={onBack}
          className="w-full bg-secondary text-secondary-foreground font-semibold py-3 rounded-lg transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to Packages
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CompletePurchase;
