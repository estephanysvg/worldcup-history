// Types
import type { Match } from "../types/Match";

// #region Functions

/**
 * Fetches historical World Cup match data from the local public JSON database.
 *
 * @returns A promise that resolves to an array of Match objects.
 * @throws An error if the network response is not successful.
 */
export async function getMatches(): Promise<Match[]> {
    const response = await fetch(
        `${import.meta.env.BASE_URL}data/worldcup_matches.json`
    );
    if (!response.ok) {
        throw new Error("Error loading matches");
    }

    return response.json();
}

// #endregion