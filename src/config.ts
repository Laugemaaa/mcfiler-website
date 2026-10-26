// Alternativt kan invitationslinket sættes med VITE_DISCORD_URL i .env.
// Tillad kun rigtige Discord-invitationer, så et tomt eller forkert link
// i stedet åbner sidens forklaring om den kommende Discord-server.
const configuredUrl = import.meta.env.VITE_DISCORD_URL?.trim() ?? "";

function getDiscordInvite(value: string): string | null {
  try {
    const url = new URL(value);
    const validHost =
      url.hostname === "discord.gg" || url.hostname === "discord.com";
    const validPath =
      url.hostname === "discord.gg"
        ? /^\/[a-zA-Z0-9-]+\/?$/.test(url.pathname)
        : /^\/invite\/[a-zA-Z0-9-]+\/?$/.test(url.pathname);
    return url.protocol === "https:" &&
      validHost &&
      validPath &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export const discordUrl = getDiscordInvite(configuredUrl);
