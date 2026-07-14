import { useEffect, useState } from "react";
import { Badge } from "@mantine/core";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { Link } from "react-router-dom";
import type { Match } from "../../types/Match";
import { parseMatchDate } from "../../utils/date";

interface MatchTableProps {
    matches: Match[];
}

const PAGE_SIZE = 15;

export default function MatchTable({ matches }: MatchTableProps) {
    const [records, setRecords] = useState<Match[]>(matches);
    const [paginatedRecords, setPaginatedRecords] = useState<Match[]>([]);
    const [page, setPage] = useState(1);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Match>>({
        columnAccessor: "date",
        direction: "asc",
    });

    useEffect(() => {
        const sorted = [...matches].sort((a, b) => {
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

            return sortStatus.direction === "asc" ? comparison : -comparison;
        });

        setRecords(sorted);
        setPage(1);
        console.log(sortStatus)
    }, [matches, sortStatus]);

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;

        setPaginatedRecords(records.slice(from, to));
    }, [page, records]);

    return (
        <DataTable
            withTableBorder
            borderRadius="sm"
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
                },
                {
                    accessor: "team1",
                    title: "Local",
                },
                {
                    accessor: "result",
                    title: "Resultado",
                    render: ({ score1, score2 }) => (
                        <Badge variant="light">
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
                },
                {
                    accessor: "actions",
                    title: "",
                    render: (match) => (
                        <Link to={`/match/${match.match_id}`}>
                            Ver
                        </Link>
                    ),
                },
            ]}
        />
    );
}