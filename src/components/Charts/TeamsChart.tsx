// React
import React from "react";

// Components
import { BarChart } from "@mantine/charts";

// #region Types

/**
 * Props for the TeamsChart component.
 */
interface TeamsChartProps {
    /** Dataset containing teams and their total goals. */
    data: Array<{ team: string; goals: number }>;
}

// #endregion

// #region Components

/**
 * TeamsChart displays the top 5 teams with the most goals scored as a bar chart.
 *
 * @param props - Component props containing the team goals data.
 * @returns The BarChart component.
 */
export default function TeamsChart({ data }: TeamsChartProps): React.JSX.Element {
    return (
        <BarChart
            h={320}
            data={data}
            dataKey="team"
            series={[
                {
                    name: "goals",
                    label: "Goles",
                    color: "green",
                },
            ]}
        />
    );
}

// #endregion
