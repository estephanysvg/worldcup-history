// React
import React from "react";

// Components
import {
    Card,
    Group,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import GoalsChart from "../Charts/GoalsChart";
import RivalriesChart from "../Charts/RivalriesChart";
import TeamsChart from "../Charts/TeamsChart";

// Hooks
import { useStatistics } from "../../hooks/useStatistics";

// Types
import type { Match } from "../../types/Match";

// Styles
import {
    IconBallFootball,
    IconChartBar,
    IconChartLine,
    IconSoccerField,
    IconSwords,
    IconTrophy,
    IconUsers,
} from "@tabler/icons-react";

// #region Types

/**
 * Props for the Dashboard component.
 */
interface DashboardProps {
    /** The list of matches to build the dashboard from. */
    matches: Match[];
}

// #endregion

// #region Components

/**
 * Dashboard component displaying high-level statistics and analytical charts
 * of historical World Cup matches.
 *
 * @param props - Component props containing the matches data.
 * @returns The rendered dashboard layout.
 */
export default function Dashboard({ matches }: DashboardProps): React.JSX.Element {
    // Retrieve computed statistics metrics and chart data using custom hook
    const {
        totalMatches,
        totalGoals,
        averageGoals,
        topScorer,
        highestAttendance,
        goalsPerWorldCup,
        topTeams,
        topRivalries,
    } = useStatistics(matches);

    return (
        <Stack>
            {/* Top Row: Statistics Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
                {/* Total Matches Card */}
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

                {/* Total Goals Card */}
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

                {/* Average Goals Card */}
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

                {/* Top Scoring Team Card */}
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
                        <Title order={4}>{topScorer?.[0] ?? "-"}</Title>
                        <Text fw={600} size="lg">
                            {topScorer?.[1] ?? 0} goles
                        </Text>
                    </Stack>
                </Card>

                {/* Highest Attendance Card */}
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
                                {(highestAttendance.attendance ?? 0).toLocaleString()} espectadores
                            </Text>
                            <Text size="sm" c="dimmed">
                                Mundial {highestAttendance.world_cup_year}
                            </Text>
                        </Stack>
                    )}
                </Card>
            </SimpleGrid>

            {/* Middle Row: Goals Evolution Line Chart */}
            <Card withBorder shadow="sm" radius="md" p="lg">
                <Group justify="space-between" mb="md">
                    <Title order={4}>Evolución de goles por Mundial</Title>
                    <ThemeIcon color="blue" variant="light">
                        <IconChartLine size={18} />
                    </ThemeIcon>
                </Group>
                <GoalsChart data={goalsPerWorldCup} />
            </Card>

            {/* Bottom Row: Teams and Rivalries Bar Charts */}
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                {/* Top Teams Chart */}
                <Card withBorder shadow="sm" radius="md" p="xl">
                    <Group justify="space-between" mb="md">
                        <Title order={4}>Top 5 equipos con más goles</Title>
                        <ThemeIcon color="green" variant="light">
                            <IconChartBar size={18} />
                        </ThemeIcon>
                    </Group>
                    <TeamsChart data={topTeams} />
                </Card>

                {/* Top Rivalries Chart */}
                <Card withBorder shadow="sm" radius="md" p="xl">
                    <Group justify="space-between" mb="md">
                        <Title order={4}>Enfrentamientos más repetidos</Title>
                        <ThemeIcon color="orange" variant="light">
                            <IconSwords size={18} />
                        </ThemeIcon>
                    </Group>
                    <RivalriesChart data={topRivalries} />
                </Card>
            </SimpleGrid>
        </Stack>
    );
}

// #endregion