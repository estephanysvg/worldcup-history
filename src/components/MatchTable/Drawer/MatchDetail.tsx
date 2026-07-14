import {
    Badge,
    Divider,
    Group,
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
        <Stack>
            <Group justify="space-between">
                <Title order={3}>
                    {match.team1} vs {match.team2}
                </Title>

                <Badge size="lg">
                    {match.score1} - {match.score2}
                </Badge>
            </Group>

            <Divider />

            <Text>
                <b>Fecha:</b> {match.date}
            </Text>

            <Text>
                <b>Año:</b> {match.world_cup_year}
            </Text>

            <Text>
                <b>Fase:</b> {match.stage}
            </Text>

            <Text>
                <b>Grupo:</b> {match.group || "-"}
            </Text>

            <Text>
                <b>Ciudad:</b> {match.city}
            </Text>

            <Text>
                <b>Estadio:</b> {match.stadium}
            </Text>

            <Text>
                <b>Asistencia:</b>{" "}
                {match.attendance.toLocaleString()}
            </Text>

            {match.obs && (
                <Text>
                    <b>Observaciones:</b> {match.obs}
                </Text>
            )}
        </Stack>
    );
}