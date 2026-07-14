// React
import React from "react";

// Components
import { LineChart } from "@mantine/charts";

// #region Types

/**
 * Props for the GoalsChart component.
 */
interface GoalsChartProps {
    /** Dataset containing goals per world cup year. */
    data: Array<{ year: string; goals: number }>;
}

// #endregion

// #region Components

/**
 * GoalsChart displays the evolution of total goals scored per World Cup year as a line chart.
 *
 * @param props - Component props containing the goals data.
 * @returns The LineChart component.
 */
export default function GoalsChart({ data }: GoalsChartProps): React.JSX.Element {
    return (
        <LineChart
            h={340}
            data={data}
            dataKey="year"
            curveType="linear"
            withDots
            gridAxis="xy"
            series={[
                {
                    name: "goals",
                    label: "Goles",
                    color: "blue",
                },
            ]}
        />
    );
}

// #endregion
