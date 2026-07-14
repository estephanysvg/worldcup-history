import type { Match } from "../types/Match";

export async function getMatches(): Promise<Match[]> {
    const response = await fetch("/data/worldcup_matches.json");

    if (!response.ok) {
        throw new Error("Error loading matches");
    }

    return response.json();
}