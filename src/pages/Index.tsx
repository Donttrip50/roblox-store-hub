import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import WelcomeStep from "@/components/WelcomeStep";
import ConfirmIdentity from "@/components/ConfirmIdentity";
import PackageSelect from "@/components/PackageSelect";
import CompletePurchase from "@/components/CompletePurchase";
import { type Package } from "@/lib/store";
import { CheckCircle } from "lucide-react";

type Step = "welcome" | "confirm" | "packages" | "purchase" | "done";

const stepConfig: Record<Step, { title: string; subtitle: string }> = {
  welcome: { title: "Buy Source Access", subtitle: "Enter your usernames to get started." },
  confirm: { title: "Confirm Your Identity", subtitle: "Is this your Roblox account?" },
  packages: { title: "Choose Your Package", subtitle: "Select the source access that fits your needs" },
  purchase: { title: "Complete Purchase", subtitle: "Buy the game pass to unlock access" },
  done: { title: "Thank You!", subtitle: "Your purchase has been logged" },
};

const Index = () => {
  const [step, setStep] = useState<Step>("welcome");
  const [robloxUsername, setRobloxUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [robloxUserId, setRobloxUserId] = useState("");
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  const { title, subtitle } = stepConfig[step];

  return (
    <PageLayout title={title} subtitle={subtitle} key={step}>
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div key="welcome" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <WelcomeStep
              onContinue={(r, d) => {
                setRobloxUsername(r);
                setDiscordUsername(d);
                setStep("confirm");
              }}
            />
          </motion.div>
        )}
        {step === "confirm" && (
          <motion.div key="confirm" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <ConfirmIdentity
              robloxUsername={robloxUsername}
              discordUsername={discordUsername}
              onConfirm={(uid) => {
                setRobloxUserId(uid);
                setStep("packages");
              }}
              onGoBack={() => setStep("welcome")}
            />
          </motion.div>
        )}
        {step === "packages" && (
          <motion.div key="packages" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <PackageSelect
              onSelect={(pkg) => {
                setSelectedPkg(pkg);
                setStep("purchase");
              }}
              onBack={() => setStep("confirm")}
            />
          </motion.div>
        )}
        {step === "purchase" && selectedPkg && (
          <motion.div key="purchase" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <CompletePurchase
              pkg={selectedPkg}
              robloxUsername={robloxUsername}
              discordUsername={discordUsername}
              robloxUserId={robloxUserId}
              onComplete={() => setStep("done")}
              onBack={() => setStep("packages")}
            />
          </motion.div>
        )}
        {step === "done" && (
          <motion.div
            key="done"
            className="bg-card border border-border rounded-lg p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            </motion.div>
            <motion.h2
              className="text-xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              Purchase Logged!
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              Open a Discord ticket with your Roblox username to receive access.
            </motion.p>
            <motion.button
              onClick={() => setStep("welcome")}
              className="bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.3 }}
            >
              Start Over
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Index;
