import { Tabs } from "@mantine/core";
import Dashboard from "../Dashboard/Dashboard";
import MatchTable from "../MatchTable/MatchTable";
import type { Match } from "../../types/Match";
import { IconLayoutDashboard, IconPlayFootball } from "@tabler/icons-react";

interface AppTabsProps {
    matches: Match[];
}

export default function AppTabs({ matches }: AppTabsProps) {
    return (
        <Tabs defaultValue="dashboard">
            <Tabs.List>
                <Tabs.Tab leftSection={<IconLayoutDashboard size={16} />} value="dashboard">Dashboard</Tabs.Tab>
                <Tabs.Tab leftSection={<IconPlayFootball size={16} />} value="matches">Partidos</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="dashboard" pt="md">
                <Dashboard matches={matches} />
            </Tabs.Panel>

            <Tabs.Panel value="matches" pt="md">
                <MatchTable matches={matches} />
            </Tabs.Panel>
        </Tabs>
    );
}