// React
import React from "react";

// Components
import { BarChart } from "@mantine/charts";

// #region Types

/**
 * Props for the RivalriesChart component.
 */
interface RivalriesChartProps {
    /** Dataset containing matchups and their played counts. */
    data: Array<{ matchup: string; games: number }>;
}

// #endregion

// #region Components

/**
 * RivalriesChart displays the top 5 most repeated matchups as a vertical bar chart.
 *
 * @param props - Component props containing the rivalry data.
 * @returns The BarChart component.
 */
export default function RivalriesChart({ data }: RivalriesChartProps): React.JSX.Element {
    return (
        <BarChart
            h={320}
            data={data}
            dataKey="matchup"
            orientation="vertical"
            gridAxis="y"
            withXAxis
            withYAxis
            series={[
                {
                    name: "games",
                    label: "Partidos",
                    color: "orange",
                },
            ]}
        />
    );
}

// #endregion
