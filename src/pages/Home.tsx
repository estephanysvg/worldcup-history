import { Container, Group } from "@mantine/core";
import { useMatches } from "../hooks/useMatches";
import AppTabs from "../components/Tabs/Tabs";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

export default function Home() {
    const { matches } = useMatches();

    return (
        <>
            <Group justify="flex-end" p="md" pb={0}>
                <ThemeToggle />
            </Group>

            <Container size="xl" py="xl">
                <AppTabs matches={matches} />
            </Container>
        </>
    );
}