// React
import React, { useState } from "react";

// Components
import {
    Badge,
    Button,
    Drawer,
    MultiSelect,
    Select,
    TextInput,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import MatchDetail from "./Drawer/MatchDetail";

// Hooks
import { useDisclosure } from "@mantine/hooks";
import { useFilters } from "../../hooks/useFilters";

// Types
import type { Match } from "../../types/Match";

// Styles
import {
    IconExternalLink,
    IconMoodLookDown,
    IconSearch,
} from "@tabler/icons-react";

// #region Types

/**
 * Props for the MatchTable component.
 */
interface MatchTableProps {
    /** List of World Cup matches. */
    matches: Match[];
}

// #endregion

// #region Components

/**
 * MatchTable renders an interactive data table of all World Cup matches
 * with robust searching, pagination, custom column sorting, and filters.
 * Clicking a match row detail action displays detailed specs in a drawer.
 *
 * @param props - Component props containing the matches data.
 * @returns The rendered match table and its details drawer.
 */
export default function MatchTable({ matches }: MatchTableProps): React.JSX.Element {
    // Utilize custom hook to manage search, sorting, filtering, and pagination
    const {
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
        pageSize,
    } = useFilters(matches);

    // Local state for managing details drawer view
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    return (
        <>
            {/* Search Input Field */}
            <TextInput
                mb="md"
                w={300}
                placeholder="Buscar equipo..."
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
            />

            {/* Match Data Table */}
            <DataTable
                withTableBorder
                borderRadius="md"
                minHeight={150}
                striped
                highlightOnHover
                records={paginatedRecords}
                totalRecords={records.length}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={setPage}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                columns={[
                    {
                        accessor: "date",
                        title: "Fecha",
                        sortable: true,
                    },
                    {
                        accessor: "world_cup_year",
                        title: "Año",
                        sortable: true,
                        filtering: !!selectedYear,
                        filter: (
                            <Select
                                data={years}
                                value={selectedYear}
                                onChange={(value) => setSelectedYear(value)}
                                placeholder="Todos"
                                clearable
                                comboboxProps={{ withinPortal: false }}
                            />
                        ),
                    },
                    {
                        accessor: "team1",
                        title: "Local",
                        filtering: selectedTeams.length > 0,
                        filter: (
                            <MultiSelect
                                data={teams}
                                value={selectedTeams}
                                onChange={setSelectedTeams}
                                placeholder="Equipos"
                                searchable
                                clearable
                                comboboxProps={{ withinPortal: false }}
                            />
                        ),
                    },
                    {
                        accessor: "result",
                        title: "Resultado",
                        render: ({ score1, score2 }) => (
                            <Badge radius="md" variant="light">
                                {score1} - {score2}
                            </Badge>
                        ),
                    },
                    {
                        accessor: "goals",
                        title: "Goles",
                        sortable: true,
                        render: ({ score1, score2 }) => score1 + score2,
                    },
                    {
                        accessor: "team2",
                        title: "Visitante",
                    },
                    {
                        accessor: "stage",
                        title: "Fase",
                        filtering: !!selectedStage,
                        filter: (
                            <Select
                                data={stages}
                                value={selectedStage}
                                onChange={(value) => setSelectedStage(value)}
                                placeholder="Todas"
                                clearable
                                comboboxProps={{ withinPortal: false }}
                            />
                        ),
                    },
                    {
                        accessor: "group",
                        title: "Grupo",
                        filtering: !!selectedGroup,
                        filter: (
                            <Select
                                data={groups}
                                value={selectedGroup}
                                onChange={(value) => setSelectedGroup(value)}
                                placeholder="Todos"
                                clearable
                                comboboxProps={{ withinPortal: false }}
                            />
                        ),
                    },
                    {
                        accessor: "city",
                        title: "Ciudad",
                        filtering: !!selectedCity,
                        filter: (
                            <Select
                                data={cities}
                                value={selectedCity}
                                onChange={(value) => setSelectedCity(value)}
                                placeholder="Todas"
                                clearable
                                searchable
                                comboboxProps={{ withinPortal: false }}
                            />
                        ),
                    },
                    {
                        accessor: "stadium",
                        title: "Estadio",
                        filtering: !!selectedStadium,
                        filter: (
                            <Select
                                data={stadiums}
                                value={selectedStadium}
                                onChange={(value) => setSelectedStadium(value)}
                                placeholder="Todos"
                                clearable
                                searchable
                                comboboxProps={{ withinPortal: false }}
                            />
                        ),
                    },
                    {
                        accessor: "actions",
                        title: "",
                        render: (match) => (
                            <Button
                                variant="transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setSelectedMatch(match);
                                    openDrawer();
                                }}
                            >
                                <IconExternalLink size={18} />
                            </Button>
                        ),
                    },
                ]}
                noRecordsIcon={<IconMoodLookDown size={40} />}
                noRecordsText="No hay resultados que coincidan con la búsqueda."
            />

            {/* Sidebar Drawer displaying Match Details */}
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                title="Detalle del partido"
                position="right"
                size="lg"
                overlayProps={{
                    backgroundOpacity: 0.4,
                    blur: 3,
                }}
            >
                {selectedMatch && <MatchDetail match={selectedMatch} />}
            </Drawer>
        </>
    );
}

// #endregion