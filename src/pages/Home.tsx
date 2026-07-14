import { Container, Title } from "@mantine/core";
import { useMatches } from "../hooks/useMatches";
import MatchTable from "../components/MatchTable/MatchTable";

export default function Home() {
    const { matches, loading } = useMatches();

    return (
        <Container size="xl" py="xl">
            <Title mb="lg">
                FIFA World Cup History
            </Title>

            {loading ? (
                "Loading..."
            ) : (
                <MatchTable matches={matches} />)}
        </Container>
    );
}