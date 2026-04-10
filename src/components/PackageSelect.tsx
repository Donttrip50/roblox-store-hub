import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {packages.map((pkg, index) => (
        <motion.button
          key={pkg.id}
          onClick={() => setSelectedId(pkg.id)}
          className={`w-full text-left bg-card border rounded-lg p-5 transition-colors duration-200 ${
            selectedId === pkg.id ? "border-accent" : "border-border hover:border-ring"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {selectedId === pkg.id ? (
                <motion.div
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
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
        </motion.button>
      ))}

      <motion.button
        onClick={() => selected && onSelect(selected)}
        disabled={!selected}
        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        whileHover={selected ? { scale: 1.02 } : {}}
        whileTap={selected ? { scale: 0.98 } : {}}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: packages.length * 0.1 + 0.1, duration: 0.3 }}
      >
        {selected ? `Buy Game Pass — ${selected.price} R$` : "Select a package"}
      </motion.button>
      <motion.button
        onClick={onBack}
        className="w-full bg-secondary text-secondary-foreground font-semibold py-3 rounded-lg transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: packages.length * 0.1 + 0.2, duration: 0.3 }}
      >
        Back
      </motion.button>
    </motion.div>
  );
};

export default PackageSelect;
