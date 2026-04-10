import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import { getSettings } from "@/lib/store";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, subtitle, children }: PageLayoutProps) => {
  const settings = getSettings();

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center px-4 py-8">
      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
        >
          <Monitor className="w-7 h-7 text-foreground" />
        </motion.div>
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-muted-foreground mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <motion.p
        className="text-muted-foreground text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        {settings.gameName} • Secure Robux Payments
      </motion.p>
    </div>
  );
};

export default PageLayout;
