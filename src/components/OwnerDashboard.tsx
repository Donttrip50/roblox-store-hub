import { useState, useEffect } from "react";
import { getSettings, saveSettings, getBuyerLogs, type SiteSettings, type Package, type BuyerLog } from "@/lib/store";
import { Settings, Users, Package as PackageIcon, LogOut, Plus, Trash2 } from "lucide-react";

interface OwnerDashboardProps {
  onLogout: () => void;
}

const OwnerDashboard = ({ onLogout }: OwnerDashboardProps) => {
  const [tab, setTab] = useState<"settings" | "packages" | "logs">("logs");
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [logs] = useState<BuyerLog[]>(getBuyerLogs());
  const [saved, setSaved] = useState(false);

  const save = (s: SiteSettings) => {
    setSettings(s);
    saveSettings(s);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field: keyof SiteSettings, value: string) => {
    save({ ...settings, [field]: value });
  };

  const updatePackage = (index: number, field: keyof Package, value: string | number | boolean | string[]) => {
    const pkgs = [...settings.packages];
    pkgs[index] = { ...pkgs[index], [field]: value };
    save({ ...settings, packages: pkgs });
  };

  const addPackage = () => {
    const newPkg: Package = {
      id: Date.now().toString(),
      name: "New Package",
      price: 100,
      duration: "7 days",
      features: ["Feature 1"],
    };
    save({ ...settings, packages: [...settings.packages, newPkg] });
  };

  const removePackage = (index: number) => {
    const pkgs = settings.packages.filter((_, i) => i !== index);
    save({ ...settings, packages: pkgs });
  };

  const tabs = [
    { id: "logs" as const, label: "Buyer Logs", icon: Users },
    { id: "settings" as const, label: "Settings", icon: Settings },
    { id: "packages" as const, label: "Packages", icon: PackageIcon },
  ];

  return (
    <div className="min-h-screen grid-bg">
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Owner Panel</h1>
          <div className="flex items-center gap-3">
            {saved && <span className="text-success text-sm font-medium">Saved ✓</span>}
            <button onClick={onLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition text-sm">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                tab === t.id ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {tab === "logs" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground mb-4">Buyer Logs ({logs.length})</h2>
            {logs.length === 0 && <p className="text-muted-foreground text-sm">No purchases yet.</p>}
            {logs.map((log) => (
              <div key={log.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-foreground">{log.robloxUsername}</p>
                    <p className="text-sm text-muted-foreground">Discord: {log.discordUsername}</p>
                    <p className="text-sm text-muted-foreground">User ID: {log.robloxUserId}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{log.packageName}</p>
                    <p className="text-accent font-semibold">{log.price} R$</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground mb-4">Site Settings</h2>
            {[
              { label: "Game Name", field: "gameName" as const, value: settings.gameName },
              { label: "Game Pass Link", field: "gamepassLink" as const, value: settings.gamepassLink },
              { label: "Discord Link", field: "discordLink" as const, value: settings.discordLink },
              { label: "Discord Webhook URL", field: "discordWebhookUrl" as const, value: settings.discordWebhookUrl },
            ].map((item) => (
              <div key={item.field} className="bg-card border border-border rounded-lg p-4">
                <label className="text-sm font-medium text-foreground mb-2 block">{item.label}</label>
                <input
                  value={item.value}
                  onChange={(e) => updateField(item.field, e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            ))}
          </div>
        )}

        {tab === "packages" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Packages ({settings.packages.length})</h2>
              <button onClick={addPackage} className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition">
                <Plus className="w-4 h-4" /> Add Package
              </button>
            </div>
            {settings.packages.map((pkg, i) => (
              <div key={pkg.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <input
                    value={pkg.name}
                    onChange={(e) => updatePackage(i, "name", e.target.value)}
                    className="bg-input border border-border rounded px-3 py-1.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <button onClick={() => removePackage(i)} className="text-destructive hover:opacity-80 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Price (R$)</label>
                    <input
                      type="number"
                      value={pkg.price}
                      onChange={(e) => updatePackage(i, "price", Number(e.target.value))}
                      className="w-full bg-input border border-border rounded px-3 py-1.5 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Duration</label>
                    <input
                      value={pkg.duration}
                      onChange={(e) => updatePackage(i, "duration", e.target.value)}
                      className="w-full bg-input border border-border rounded px-3 py-1.5 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Features (one per line)</label>
                  <textarea
                    value={pkg.features.join("\n")}
                    onChange={(e) => updatePackage(i, "features", e.target.value.split("\n"))}
                    rows={3}
                    className="w-full bg-input border border-border rounded px-3 py-1.5 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={!!pkg.popular}
                    onChange={(e) => updatePackage(i, "popular", e.target.checked)}
                    className="rounded"
                  />
                  Mark as Popular
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
