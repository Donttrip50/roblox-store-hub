export interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface BuyerLog {
  id: string;
  robloxUsername: string;
  discordUsername: string;
  robloxUserId: string;
  packageName: string;
  price: number;
  timestamp: string;
}

export interface SiteSettings {
  gameName: string;
  gamepassLink: string;
  discordLink: string;
  discordWebhookUrl: string;
  packages: Package[];
}

const DEFAULT_PACKAGES: Package[] = [
  {
    id: "1day",
    name: "1 Day Access",
    price: 30,
    duration: "24 hours",
    features: ["Full source access for 24 hours", "Discord support during access", "Setup guide included"],
  },
  {
    id: "1week",
    name: "1 Week Access",
    price: 150,
    duration: "7 days",
    features: ["Full source access for 7 days", "Discord support during access", "Setup guide included", "Priority help"],
  },
  {
    id: "1month",
    name: "1 Month Access",
    price: 400,
    duration: "30 days",
    features: ["Full source access for 30 days", "Discord support during access", "Setup guide included", "Priority help", "Free updates during period"],
    popular: true,
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: 650,
    duration: "Forever",
    features: ["Permanent full source access", "Lifetime Discord support", "Setup guide included", "1-on-1 setup session", "All future updates free"],
  },
];

const DEFAULT_SETTINGS: SiteSettings = {
  gameName: "Immortal Hub Sources",
  gamepassLink: "https://www.roblox.com/game-pass/",
  discordLink: "https://discord.gg/immortalhub",
  discordWebhookUrl: "",
  packages: DEFAULT_PACKAGES,
};

export function getSettings(): SiteSettings {
  const stored = localStorage.getItem("site_settings");
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem("site_settings", JSON.stringify(settings));
}

export function getBuyerLogs(): BuyerLog[] {
  const stored = localStorage.getItem("buyer_logs");
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  return [];
}

export function addBuyerLog(log: BuyerLog) {
  const logs = getBuyerLogs();
  logs.unshift(log);
  localStorage.setItem("buyer_logs", JSON.stringify(logs));
}

export async function sendDiscordWebhook(
  webhookUrl: string,
  robloxUsername: string,
  discordUsername: string,
  packageName: string,
  price: number
) {
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "🎮 New Purchase!",
          color: 0x00ff88,
          fields: [
            { name: "Roblox Username", value: robloxUsername, inline: true },
            { name: "Discord Username", value: discordUsername, inline: true },
            { name: "Package", value: packageName, inline: true },
            { name: "Price", value: `${price} R$`, inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Immortal Hub Sources" },
        }],
      }),
    });
  } catch (e) {
    console.error("Webhook failed:", e);
  }
}

// Owner panel key
export const OWNER_KEY = "IMH-X9K4-2026-SECURE";
