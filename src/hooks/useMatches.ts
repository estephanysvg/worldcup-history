// React
import { useEffect, useState } from "react";

// Services
import { getMatches } from "../services/matches.service";

// Types
import type { Match } from "../types/Match";

// #region Types

/**
 * Result structure returned by the useMatches hook.
 */
export interface UseMatchesResult {
    /** The loaded list of historical World Cup matches. */
    matches: Match[];
    /** Boolean flag indicating if data loading is still in progress. */
    loading: boolean;
}

// #endregion

// #region Functions

/**
 * Custom hook that orchestrates loading the matches dataset on mount
 * and provides the loaded data along with the loading state.
 *
 * @returns An object containing the list of matches and loading flag.
 */
export function useMatches(): UseMatchesResult {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMatches()
            .then(setMatches)
            .catch((err) => {
                console.error("Failed to load matches dataset:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        matches,
        loading,
    };
}

// #endregion