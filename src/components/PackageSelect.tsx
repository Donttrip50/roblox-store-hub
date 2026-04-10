import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { type Package, getSettings } from "@/lib/store";

interface PackageSelectProps {
  onSelect: (pkg: Package) => void;
  onBack: () => void;
}

const PackageSelect = ({ onSelect, onBack }: PackageSelectProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const settings = getSettings();
  const packages = settings.packages;
  const selected = packages.find((p) => p.id === selectedId);

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <button
          key={pkg.id}
          onClick={() => setSelectedId(pkg.id)}
          className={`w-full text-left bg-card border rounded-lg p-5 transition ${
            selectedId === pkg.id ? "border-accent" : "border-border hover:border-ring"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {selectedId === pkg.id ? (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-foreground">{pkg.name}</span>
                  <span className="text-muted-foreground font-medium">{pkg.price} R$</span>
                </div>
                {pkg.popular && (
                  <span className="text-xs font-semibold border border-border rounded-md px-2 py-0.5 text-foreground">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-1.5">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}

      <button
        onClick={() => selected && onSelect(selected)}
        disabled={!selected}
        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {selected ? `Buy Game Pass — ${selected.price} R$` : "Select a package"}
      </button>
      <button
        onClick={onBack}
        className="w-full bg-secondary text-secondary-foreground font-semibold py-3 rounded-lg hover:opacity-80 transition"
      >
        Back
      </button>
    </div>
  );
};

export default PackageSelect;
