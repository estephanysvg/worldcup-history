import {
    Card,
    Group,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import { BarChart, LineChart } from "@mantine/charts";
import {
    IconBallFootball,
    IconChartBar,
    IconChartLine,
    IconSoccerField,
    IconSwords,
    IconTrophy,
    IconUsers,
} from "@tabler/icons-react";
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

    const topScorer = [...goalsByTeam.entries()].sort(
        (a, b) => b[1] - a[1]
    )[0];

    // Mayor asistencia
    const highestAttendance = matches.reduce<Match | null>((max, current) => {
        if (!max) return current;

        return (current.attendance ?? 0) > (max.attendance ?? 0)
            ? current
            : max;
    }, null);

    // Evolución de goles por Mundial
    const goalsPerWorldCup = [...new Set(matches.map((m) => m.world_cup_year))]
        .sort((a, b) => a - b)
        .map((year) => ({
            year: String(year),
            goals: matches
                .filter((m) => m.world_cup_year === year)
                .reduce((acc, m) => acc + m.score1 + m.score2, 0),
        }));

    // Top 5 equipos
    const topTeams = [...goalsByTeam.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([team, goals]) => ({
            team,
            goals,
        }));

    // Enfrentamientos más repetidos
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

    return (
        <Stack>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
                <Card withBorder shadow="sm" radius="md" p="lg">
                    <Group justify="space-between" mb="xs">
                        <Text c="dimmed" size="sm">
                            Total de partidos
                        </Text>

                        <ThemeIcon color="blue" variant="light">
                            <IconSoccerField size={18} />
                        </ThemeIcon>
                    </Group>

                    <Title order={2}>{totalMatches}</Title>
                </Card>

                <Card withBorder shadow="sm" radius="md" p="lg">
                    <Group justify="space-between" mb="xs">
                        <Text c="dimmed" size="sm">
                            Total de goles
                        </Text>

                        <ThemeIcon color="green" variant="light">
                            <IconBallFootball size={18} />
                        </ThemeIcon>
                    </Group>

                    <Title order={2}>{totalGoals}</Title>
                </Card>

                <Card withBorder shadow="sm" radius="md" p="lg">
                    <Group justify="space-between" mb="xs">
                        <Text c="dimmed" size="sm">
                            Media de goles
                        </Text>

                        <ThemeIcon color="orange" variant="light">
                            <IconChartBar size={18} />
                        </ThemeIcon>
                    </Group>

                    <Title order={2}>{averageGoals}</Title>
                </Card>

                <Card withBorder shadow="sm" radius="md" p="lg">
                    <Group justify="space-between">
                        <Text c="dimmed" size="sm">
                            Equipo con más goles
                        </Text>

                        <ThemeIcon color="yellow" variant="light">
                            <IconTrophy size={18} />
                        </ThemeIcon>
                    </Group>

                    <Stack gap={6} mt="md">
                        <Title order={4}>{topScorer?.[0]}</Title>

                        <Text fw={600} size="lg">
                            {topScorer?.[1]} goles
                        </Text>
                    </Stack>
                </Card>

                <Card withBorder shadow="sm" radius="md" p="lg">
                    <Group justify="space-between">
                        <Text c="dimmed" size="sm">
                            Mayor asistencia
                        </Text>

                        <ThemeIcon color="grape" variant="light">
                            <IconUsers size={18} />
                        </ThemeIcon>
                    </Group>

                    {highestAttendance && (
                        <Stack gap={6} mt="md">
                            <Title order={5}>
                                {highestAttendance.team1} vs{" "}
                                {highestAttendance.team2}
                            </Title>

                            <Text fw={600}>
                                {highestAttendance.attendance.toLocaleString()} espectadores
                            </Text>

                            <Text size="sm" c="dimmed">
                                Mundial {highestAttendance.world_cup_year}
                            </Text>
                        </Stack>
                    )}
                </Card>
            </SimpleGrid>

            <Card withBorder shadow="sm" radius="md" p="lg">
                <Group justify="space-between" mb="md">
                    <Title order={4}>Evolución de goles por Mundial</Title>

                    <ThemeIcon color="blue" variant="light">
                        <IconChartLine size={18} />
                    </ThemeIcon>
                </Group>

                <LineChart
                    h={340}
                    data={goalsPerWorldCup}
                    dataKey="year"
                    curveType="linear"
                    withDots
                    gridAxis="xy"
                    series={[
                        {
                            name: "goals",
                            label: "Goles",
                            color: "blue",
                        },
                    ]}
                />
            </Card>

            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <Card withBorder shadow="sm" radius="md" p="lg">
                    <Group justify="space-between" mb="md">
                        <Title order={4}>
                            Top 5 equipos con más goles
                        </Title>

                        <ThemeIcon color="green" variant="light">
                            <IconChartBar size={18} />
                        </ThemeIcon>
                    </Group>

                    <BarChart
                        h={320}
                        data={topTeams}
                        dataKey="team"
                        series={[
                            {
                                name: "goals",
                                label: "Goles",
                                color: "green",
                            },
                        ]}
                    />
                </Card>

                <Card withBorder shadow="sm" radius="md" p="lg">
                    <Group justify="space-between" mb="md">
                        <Title order={4}>
                            Enfrentamientos más repetidos
                        </Title>

                        <ThemeIcon color="orange" variant="light">
                            <IconSwords size={18} />
                        </ThemeIcon>
                    </Group>

                    <BarChart
                        h={320}
                        data={topRivalries}
                        dataKey="matchup"
                        orientation="vertical"
                        gridAxis="y"
                        withXAxis
                        withYAxis
                        series={[
                            {
                                name: "games",
                                label: "Partidos",
                                color: "orange",
                            },
                        ]}
                    />
                </Card>
            </SimpleGrid>
        </Stack>
    );
}