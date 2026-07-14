import { useEffect, useMemo, useState } from "react";
import { Badge, Button, MultiSelect, Select } from "@mantine/core";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import type { Match } from "../../types/Match";
import { parseMatchDate } from "../../utils/date";
import { TextInput } from "@mantine/core";
import { IconSearch, IconMoodLookDown, IconExternalLink } from "@tabler/icons-react";
import { Drawer } from "@mantine/core";
import MatchDetail from "./Drawer/MatchDetail";
import { useDisclosure } from "@mantine/hooks";

interface MatchTableProps {
    matches: Match[];
}

const PAGE_SIZE = 15;

export default function MatchTable({ matches }: MatchTableProps) {
    const [records, setRecords] = useState<Match[]>(matches);

    console.log(matches.length)
    const [paginatedRecords, setPaginatedRecords] = useState<Match[]>([]);
    const [page, setPage] = useState(1);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Match>>({
        columnAccessor: "date",
        direction: "asc",
    });

    const [search, setSearch] = useState("");

    // Filtros
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [selectedStage, setSelectedStage] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedStadium, setSelectedStadium] = useState<string | null>(null);


    const [opened, { open, close }] = useDisclosure(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    // Opciones de los filtros
    const years = useMemo(
        () =>
            [...new Set(matches.map((m) => String(m.world_cup_year)))].sort(),
        [matches]
    );

    const teams = useMemo(
        () =>
            [...new Set(matches.flatMap((m) => [m.team1, m.team2]))].sort(),
        [matches]
    );

    const stages = useMemo(
        () => [...new Set(matches.map((m) => m.stage))].sort(),
        [matches]
    );

    const groups = useMemo(
        () =>
            [...new Set(matches.map((m) => m.group).filter(Boolean))].sort(),
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

    useEffect(() => {
        let filtered = [...matches];

        if (search.trim() !== "") {
            const query = search.toLowerCase();

            filtered = filtered.filter(
                (m) =>
                    m.team1.toLowerCase().includes(query) ||
                    m.team2.toLowerCase().includes(query)
            );
        }

        if (selectedYear) {
            filtered = filtered.filter(
                (m) => m.world_cup_year === Number(selectedYear)
            );
        }

        if (selectedTeams.length) {
            filtered = filtered.filter(
                (m) =>
                    selectedTeams.includes(m.team1) ||
                    selectedTeams.includes(m.team2)
            );
        }

        if (selectedStage) {
            filtered = filtered.filter((m) => m.stage === selectedStage);
        }

        if (selectedGroup) {
            filtered = filtered.filter((m) => m.group === selectedGroup);
        }

        if (selectedCity) {
            filtered = filtered.filter((m) => m.city === selectedCity);
        }

        if (selectedStadium) {
            filtered = filtered.filter((m) => m.stadium === selectedStadium);
        }

        filtered.sort((a, b) => {
            let comparison = 0;

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
                        a.score1 + a.score2 - (b.score1 + b.score2);
                    break;

                default:
                    comparison = 0;
            }

            return sortStatus.direction === "asc"
                ? comparison
                : -comparison;
        });

        setRecords(filtered);
        setPage(1);
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

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;

        setPaginatedRecords(records.slice(from, to));
    }, [page, records]);

    return (
        <>
            <TextInput
                mb="md"
                w="300"
                placeholder="Buscar equipo..."
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
            />
            <DataTable
                withTableBorder
                borderRadius="md"
                minHeight={150}
                striped
                highlightOnHover
                records={paginatedRecords}
                totalRecords={records.length}
                recordsPerPage={PAGE_SIZE}
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
                                onChange={(value) => {
                                    setSelectedYear(value as string | null);
                                }}
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
                                onChange={(value) => {
                                    setSelectedStage(value as string | null);
                                }}
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
                                onChange={(value) => {
                                    setSelectedGroup(value as string | null);
                                }}
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
                                onChange={(value) => {
                                    setSelectedCity(value as string | null);
                                }}
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
                                onChange={(value) => {
                                    setSelectedStadium(value as string | null);
                                }}
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
                                    open();
                                }}>
                                <IconExternalLink size={18} />
                            </Button>
                        ),
                    },
                ]}
                noRecordsIcon={<IconMoodLookDown size={40} />}
                noRecordsText="No hay resultados que coincidan con la búsqueda."
            />

            <Drawer
                opened={opened}
                onClose={close}
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