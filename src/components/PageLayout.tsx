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
      <div className="flex flex-col items-center mb-8 animate-fade-in">
        <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
          <Monitor className="w-7 h-7 text-foreground" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-center">{subtitle}</p>
        )}
      </div>
      <div className="w-full max-w-md animate-fade-in">{children}</div>
      <p className="text-muted-foreground text-sm mt-8">
        {settings.gameName} • Secure Robux Payments
      </p>
    </div>
  );
};

export default PageLayout;
