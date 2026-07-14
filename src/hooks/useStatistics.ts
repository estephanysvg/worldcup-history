// React
import { useMemo } from "react";

// Types
import type { Match } from "../types/Match";

// #region Types

/**
 * Represents the structure of statistics calculated from matches.
 */
export interface UseStatisticsResult {
    /** Total number of matches played. */
    totalMatches: number;
    /** Total number of goals scored. */
    totalGoals: number;
    /** Average goals per match. */
    averageGoals: string;
    /** The team with the most goals scored (name and goals). */
    topScorer: [string, number] | undefined;
    /** The match with the highest attendance. */
    highestAttendance: Match | null;
    /** Dataset for goals evolution over different world cups. */
    goalsPerWorldCup: Array<{ year: string; goals: number }>;
    /** Dataset for the top 5 teams by total goals scored. */
    topTeams: Array<{ team: string; goals: number }>;
    /** Dataset for the top 5 most repeated matchups. */
    topRivalries: Array<{ matchup: string; games: number }>;
}

// #endregion

// #region Functions

/**
 * Custom hook to calculate various statistics from a list of World Cup matches.
 *
 * @param matches - Array of World Cup match results.
 * @returns An object containing calculated metrics and chart datasets.
 */
export function useStatistics(matches: Match[]): UseStatisticsResult {
    return useMemo(() => {
        const totalMatches = matches.length;

        // Total goals scored
        const totalGoals = matches.reduce(
            (acc, match) => acc + match.score1 + match.score2,
            0
        );

        // Average goals per match
        const averageGoals =
            totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : "0";

        // Goles por equipo
        const goalsByTeam = new Map<string, number>();
        matches.forEach((match) => {
            goalsByTeam.set(
                match.team1,
                (goalsByTeam.get(match.team1) ?? 0) + match.score1
            );
            goalsByTeam.set(
                match.team2,
                (goalsByTeam.get(match.team2) ?? 0) + match.score2
            );
        });

        // Top scoring team
        const topScorer = [...goalsByTeam.entries()].sort(
            (a, b) => b[1] - a[1]
        )[0];

        // Match with highest attendance (safely handles null values)
        const highestAttendance = matches.reduce<Match | null>((max, current) => {
            if (!max) return current;
            const currentAttendance = current.attendance ?? 0;
            const maxAttendance = max.attendance ?? 0;
            return currentAttendance > maxAttendance ? current : max;
        }, null);

        // Goals evolution per World Cup year
        const goalsPerWorldCup = [...new Set(matches.map((m) => m.world_cup_year))]
            .sort((a, b) => a - b)
            .map((year) => ({
                year: String(year),
                goals: matches
                    .filter((m) => m.world_cup_year === year)
                    .reduce((acc, m) => acc + m.score1 + m.score2, 0),
            }));

        // Top 5 scoring teams
        const topTeams = [...goalsByTeam.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([team, goals]) => ({
                team,
                goals,
            }));

        // Top 5 most repeated rivalries
        const rivalries = new Map<string, number>();
        matches.forEach((match) => {
            const rivalry = [match.team1, match.team2].sort().join(" vs ");
            rivalries.set(rivalry, (rivalries.get(rivalry) ?? 0) + 1);
        });

        const topRivalries = [...rivalries.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([matchup, games]) => ({
                matchup,
                games,
            }));

        return {
            totalMatches,
            totalGoals,
            averageGoals,
            topScorer,
            highestAttendance,
            goalsPerWorldCup,
            topTeams,
            topRivalries,
        };
    }, [matches]);
}

// #endregion
