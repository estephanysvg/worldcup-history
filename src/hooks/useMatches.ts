import { useEffect, useState } from "react";
import { getMatches } from "../services/matches.service";
import type { Match } from "../types/Match";

export function useMatches() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMatches()
            .then(setMatches)
            .finally(() => setLoading(false));
    }, []);

    return {
        matches,
        loading,
    };
}