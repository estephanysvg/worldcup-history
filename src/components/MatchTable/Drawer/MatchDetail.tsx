// React
import React from "react";

// Components
import {
    Badge,
    Divider,
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";

// Types
import type { Match } from "../../../types/Match";

// #region Types

/**
 * Props for the MatchDetail component.
 */
interface MatchDetailProps {
    /** The match object containing details to display. */
    match: Match;
}

// #endregion

// #region Components

/**
 * MatchDetail renders detailed metadata of a specific World Cup match inside a drawer or panel.
 *
 * @param props - Component props containing the match data.
 * @returns The rendered detailed match information.
 */
export default function MatchDetail({ match }: MatchDetailProps): React.JSX.Element {
    return (
        <Stack gap="lg">
            {/* Header: Teams & Score Title */}
            <Group justify="space-between">
                <Title order={3}>
                    {match.team1} vs {match.team2}
                </Title>
                <Group>
                    <Badge>Mundial {match.world_cup_year}</Badge>
                    <Badge color="grape">{match.stage}</Badge>
                </Group>
            </Group>

            <Divider />

            {/* Match Score Display */}
            <Group justify="space-around" align="center">
                <Stack align="center" gap={0}>
                    <Text c="dimmed" size="lg">
                        {match.team1}
                    </Text>
                    <Title order={1}>{match.score1}</Title>
                </Stack>

                <Title order={2}>-</Title>

                <Stack align="center" gap={0}>
                    <Text c="dimmed" size="lg">
                        {match.team2}
                    </Text>
                    <Title order={1}>{match.score2}</Title>
                </Stack>
            </Group>

            <Divider />

            {/* Grid for Detailed Properties */}
            <SimpleGrid cols={2} spacing="md">
                <Text c="dimmed">Fecha</Text>
                <Text ta="right">{match.date}</Text>

                <Text c="dimmed">Grupo</Text>
                <Text ta="right">{match.group || "-"}</Text>

                <Text c="dimmed">Estadio</Text>
                <Text ta="right">{match.stadium}</Text>

                <Text c="dimmed">Ciudad</Text>
                <Text ta="right">{match.city}</Text>

                <Text c="dimmed">Asistencia</Text>
                <Text ta="right">
                    {match.attendance !== null ? match.attendance.toLocaleString() : "Sin datos"}
                </Text>
            </SimpleGrid>

            {/* Observations Section */}
            {match.obs && (
                <>
                    <Divider
                        label="Observaciones"
                        labelPosition="left"
                    />
                    <Text>{match.obs}</Text>
                </>
            )}
        </Stack>
    );
}

// #endregion