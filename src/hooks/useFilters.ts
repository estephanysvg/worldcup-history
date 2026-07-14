// React
import { useMemo, useState } from "react";

// Components
import type { DataTableSortStatus } from "mantine-datatable";

// Types
import type { Match } from "../types/Match";

// Utils
import { parseMatchDate } from "../utils/date";

// #region Constants

const PAGE_SIZE = 15;

// #endregion

// #region Types

/**
 * Result structure returned by the useFilters hook.
 */
export interface UseFiltersResult {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    selectedYear: string | null;
    setSelectedYear: React.Dispatch<React.SetStateAction<string | null>>;

    selectedTeams: string[];
    setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>;

    selectedStage: string | null;
    setSelectedStage: React.Dispatch<React.SetStateAction<string | null>>;

    selectedGroup: string | null;
    setSelectedGroup: React.Dispatch<React.SetStateAction<string | null>>;

    selectedCity: string | null;
    setSelectedCity: React.Dispatch<React.SetStateAction<string | null>>;

    selectedStadium: string | null;
    setSelectedStadium: React.Dispatch<React.SetStateAction<string | null>>;

    sortStatus: DataTableSortStatus<Match>;
    setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus<Match>>>;

    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;

    // Options lists for filter comboboxes
    years: string[];
    teams: string[];
    stages: string[];
    groups: string[];
    cities: string[];
    stadiums: string[];

    // Results lists
    records: Match[];
    paginatedRecords: Match[];
    pageSize: number;
}

// #endregion

// #region Functions

/**
 * Custom hook to encapsulate the match searching, filtering, sorting, and pagination logic.
 *
 * @param matches - The full list of historical World Cup matches.
 * @returns The filters state and resulting filtered lists.
 */
export function useFilters(matches: Match[]): UseFiltersResult {
    // Search state
    const [search, setSearch] = useState("");

    // Filters states
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [selectedStage, setSelectedStage] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedStadium, setSelectedStadium] = useState<string | null>(null);

    // Pagination & sorting states
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Match>>({
        columnAccessor: "date",
        direction: "asc",
    });

    // Compute unique options for select fields
    const years = useMemo(
        () => [...new Set(matches.map((m) => String(m.world_cup_year)))].sort(),
        [matches]
    );

    const teams = useMemo(
        () => [...new Set(matches.flatMap((m) => [m.team1, m.team2]))].sort(),
        [matches]
    );

    const stages = useMemo(
        () => [...new Set(matches.map((m) => m.stage))].sort(),
        [matches]
    );

    const groups = useMemo(
        () =>
            [...new Set(matches.map((m) => m.group).filter((g): g is string => !!g))].sort(),
        [matches]
    );

    const cities = useMemo(
        () => [...new Set(matches.map((m) => m.city))].sort(),
        [matches]
    );

    const stadiums = useMemo(
        () => [...new Set(matches.map((m) => m.stadium))].sort(),
        [matches]
    );

    // Compute filtered and sorted records list in render phase using useMemo
    const records = useMemo(() => {
        let filtered = [...matches];

        // Search filter
        if (search.trim() !== "") {
            const query = search.toLowerCase();
            filtered = filtered.filter(
                (m) =>
                    m.team1.toLowerCase().includes(query) ||
                    m.team2.toLowerCase().includes(query)
            );
        }

        // Year filter
        if (selectedYear) {
            filtered = filtered.filter(
                (m) => m.world_cup_year === Number(selectedYear)
            );
        }

        // Selected teams filter
        if (selectedTeams.length > 0) {
            filtered = filtered.filter(
                (m) =>
                    selectedTeams.includes(m.team1) ||
                    selectedTeams.includes(m.team2)
            );
        }

        // Stage filter
        if (selectedStage) {
            filtered = filtered.filter((m) => m.stage === selectedStage);
        }

        // Group filter
        if (selectedGroup) {
            filtered = filtered.filter((m) => m.group === selectedGroup);
        }

        // City filter
        if (selectedCity) {
            filtered = filtered.filter((m) => m.city === selectedCity);
        }

        // Stadium filter
        if (selectedStadium) {
            filtered = filtered.filter((m) => m.stadium === selectedStadium);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let comparison: number;

            switch (sortStatus.columnAccessor) {
                case "date":
                    comparison =
                        parseMatchDate(a.date).getTime() -
                        parseMatchDate(b.date).getTime();
                    break;

                case "world_cup_year":
                    comparison = a.world_cup_year - b.world_cup_year;
                    break;

                case "goals":
                    comparison =
                        (a.score1 + a.score2) - (b.score1 + b.score2);
                    break;

                default:
                    comparison = 0;
            }

            return sortStatus.direction === "asc" ? comparison : -comparison;
        });

        return filtered;
    }, [
        matches,
        sortStatus,
        selectedYear,
        selectedTeams,
        selectedStage,
        selectedGroup,
        selectedCity,
        selectedStadium,
        search,
    ]);

    // Keep track of the current filters to reset the page index when they change
    const [prevFiltersHash, setPrevFiltersHash] = useState("");
    const currentFiltersHash = `${search}-${selectedYear}-${selectedTeams.join(",")}-${selectedStage}-${selectedGroup}-${selectedCity}-${selectedStadium}-${sortStatus.columnAccessor}-${sortStatus.direction}`;

    if (currentFiltersHash !== prevFiltersHash) {
        setPrevFiltersHash(currentFiltersHash);
        setPage(1);
    }

    // Compute paginated records from the filtered records list in render phase
    const paginatedRecords = useMemo(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        return records.slice(from, to);
    }, [page, records]);

    return {
        search,
        setSearch,
        selectedYear,
        setSelectedYear,
        selectedTeams,
        setSelectedTeams,
        selectedStage,
        setSelectedStage,
        selectedGroup,
        setSelectedGroup,
        selectedCity,
        setSelectedCity,
        selectedStadium,
        setSelectedStadium,
        sortStatus,
        setSortStatus,
        page,
        setPage,
        years,
        teams,
        stages,
        groups,
        cities,
        stadiums,
        records,
        paginatedRecords,
        pageSize: PAGE_SIZE,
    };
}

// #endregion
