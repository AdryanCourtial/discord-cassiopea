import { Ranks } from "../types/rank.type";

export const RankRoleConfig = {
  [Ranks.IRON]: {
    name: "Iron",
    icon: "🪨",
    colors: {
      primaryColor: "#4B4B4B"
    }
  },

  [Ranks.BRONZE]: {
    name: "Bronze",
    icon: "🥉",
    colors: {
      primaryColor: "#CD7F32"
    }
  },

  [Ranks.SILVER]: {
    name: "Silver",
    icon: "⚪",
    colors: {
      primaryColor: "#C0C0C0"
    }
  },

  [Ranks.GOLD]: {
    name: "Gold",
    icon: "🥇",
    colors: {
      primaryColor: "#FFD700"
    }
  },

  [Ranks.PLATINUM]: {
    name: "Platinum",
    icon: "💠",
    colors: {
      primaryColor: "#00BCD4"
    }
  },

  [Ranks.EMERALD]: {
    name: "Emerald",
    icon: "💚",
    colors: {
      primaryColor: "#00C853"
    }
  },

  [Ranks.DIAMOND]: {
    name: "Diamond",
    icon: "💎",
    colors: {
      primaryColor: "#6EC6FF"
    }
  },

  [Ranks.MASTER]: {
    name: "Master",
    icon: "🟣",
    colors: {
      primaryColor: "#9C27B0"
    }
  },

  [Ranks.GRANDMASTER]: {
    name: "Grandmaster",
    icon: "🔴",
    colors: {
      primaryColor: "#E53935"
    }
  },

  [Ranks.CHALLENGER]: {
    name: "Challenger",
    icon: "👑",
    colors: {
      primaryColor: "#00E5FF"
    }
  }
} as const;