import { Card, Group, SimpleGrid, Text, Title } from "@mantine/core";
import type { Match } from "../../types/Match";

interface DashboardProps {
    matches: Match[];
}

export default function Dashboard({ matches }: DashboardProps) {
    const totalMatches = matches.length;

    const totalGoals = matches.reduce(
        (acc, match) => acc + match.score1 + match.score2,
        0
    );

    const averageGoals =
        totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : "0";

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

    const topScorer = [...goalsByTeam.entries()].sort((a, b) => b[1] - a[1])[0];

    const highestAttendance = matches.reduce<Match | null>((max, current) => {
        if (!max) return current;

        return (current.attendance ?? 0) > (max.attendance ?? 0)
            ? current
            : max;
    }, null);

    return (
        <>


            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                <Card withBorder shadow="sm" radius="md">
                    <Text c="dimmed" size="sm">
                        Total de partidos
                    </Text>

                    <Title order={2}>{totalMatches}</Title>
                </Card>

                <Card withBorder shadow="sm" radius="md">
                    <Text c="dimmed" size="sm">
                        Total de goles
                    </Text>

                    <Title order={2}>{totalGoals}</Title>
                </Card>

                <Card withBorder shadow="sm" radius="md">
                    <Text c="dimmed" size="sm">
                        Media de goles
                    </Text>

                    <Title order={2}>{averageGoals}</Title>
                </Card>

                <Card withBorder shadow="sm" radius="md">
                    <Text c="dimmed" size="sm">
                        Equipo con más goles
                    </Text>

                    <Title order={4}>{topScorer?.[0]}</Title>

                    <Text>{topScorer?.[1]} goles</Text>
                </Card>

                <Card withBorder shadow="sm" radius="md">
                    <Text c="dimmed" size="sm">
                        Mayor asistencia
                    </Text>

                    {highestAttendance ? (
                        <>
                            <Title order={4}>
                                {highestAttendance.team1} vs {highestAttendance.team2}
                            </Title>

                            <Text>
                                {highestAttendance.attendance.toLocaleString()} espectadores
                            </Text>

                            <Text size="sm" c="dimmed">
                                {highestAttendance.world_cup_year}
                            </Text>
                        </>
                    ) : (
                        <Text>No hay datos</Text>
                    )}
                </Card>
            </SimpleGrid>
        </>
    );
}