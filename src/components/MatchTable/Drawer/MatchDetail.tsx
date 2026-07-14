import {
    Badge,
    Divider,
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import type { Match } from "../../../types/Match";

interface MatchDetailProps {
    match: Match;
}

export default function MatchDetail({ match }: MatchDetailProps) {
    return (
        <Stack gap="lg">
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
                    {match.attendance.toLocaleString()}
                </Text>
            </SimpleGrid>

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