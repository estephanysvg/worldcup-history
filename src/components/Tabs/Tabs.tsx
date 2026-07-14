// React
import React from "react";

// Components
import { Tabs } from "@mantine/core";
import Dashboard from "../Dashboard/Dashboard";
import MatchTable from "../MatchTable/MatchTable";

// Types
import type { Match } from "../../types/Match";

// Styles
import { IconLayoutDashboard, IconPlayFootball } from "@tabler/icons-react";

// #region Types

/**
 * Props for the AppTabs component.
 */
interface AppTabsProps {
    /** The loaded array of historical matches to pass to subcomponents. */
    matches: Match[];
}

// #endregion

// #region Components

/**
 * AppTabs renders the primary tab navigation to switch between
 * the statistical Dashboard and the matches tabular grid.
 *
 * @param props - Component props containing matches data.
 * @returns The tabs layout interface.
 */
export default function AppTabs({ matches }: AppTabsProps): React.JSX.Element {
    return (
        <Tabs defaultValue="dashboard">
            {/* Tab Header Controls */}
            <Tabs.List>
                <Tabs.Tab leftSection={<IconLayoutDashboard size={16} />} value="dashboard">
                    Dashboard
                </Tabs.Tab>
                <Tabs.Tab leftSection={<IconPlayFootball size={16} />} value="matches">
                    Partidos
                </Tabs.Tab>
            </Tabs.List>

            {/* Dashboard Tab Panel */}
            <Tabs.Panel value="dashboard" pt="md">
                <Dashboard matches={matches} />
            </Tabs.Panel>

            {/* Matches Grid Tab Panel */}
            <Tabs.Panel value="matches" pt="md">
                <MatchTable matches={matches} />
            </Tabs.Panel>
        </Tabs>
    );
}

// #endregion