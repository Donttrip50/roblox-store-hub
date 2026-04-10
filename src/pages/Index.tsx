import { useState } from "react";
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
    <PageLayout title={title} subtitle={subtitle}>
      {step === "welcome" && (
        <WelcomeStep
          onContinue={(r, d) => {
            setRobloxUsername(r);
            setDiscordUsername(d);
            setStep("confirm");
          }}
        />
      )}
      {step === "confirm" && (
        <ConfirmIdentity
          robloxUsername={robloxUsername}
          discordUsername={discordUsername}
          onConfirm={(uid) => {
            setRobloxUserId(uid);
            setStep("packages");
          }}
          onGoBack={() => setStep("welcome")}
        />
      )}
      {step === "packages" && (
        <PackageSelect
          onSelect={(pkg) => {
            setSelectedPkg(pkg);
            setStep("purchase");
          }}
          onBack={() => setStep("confirm")}
        />
      )}
      {step === "purchase" && selectedPkg && (
        <CompletePurchase
          pkg={selectedPkg}
          robloxUsername={robloxUsername}
          discordUsername={discordUsername}
          robloxUserId={robloxUserId}
          onComplete={() => setStep("done")}
          onBack={() => setStep("packages")}
        />
      )}
      {step === "done" && (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Purchase Logged!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Open a Discord ticket with your Roblox username to receive access.
          </p>
          <button
            onClick={() => setStep("welcome")}
            className="bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-80 transition"
          >
            Start Over
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default Index;
