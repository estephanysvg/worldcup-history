// Components
import { Container, Group } from "@mantine/core";
import AppTabs from "../components/Tabs/Tabs";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

// Hooks
import { useMatches } from "../hooks/useMatches";

// #region Components

/**
 * Home component serving as the landing page of the application.
 * It loads the match history dataset and presents it inside
 * a tabbed interface (Dashboard and Matches table).
 *
 * @returns The rendered layout containing the header controls and tab container.
 */
export default function Home() {
    const { matches } = useMatches();

    return (
        <>
            {/* Header controls (e.g. Light/Dark theme toggle) */}
            <Group justify="flex-end" p="md" pb={0}>
                <ThemeToggle />
            </Group>

            {/* Main Content Container */}
            <Container size="xl" py="xl">
                <AppTabs matches={matches} />
            </Container>
        </>
    );
}

// #endregion