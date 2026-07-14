// React
import React from "react";

// Components
import {
    ActionIcon,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";

// Styles
import { IconMoon, IconSun } from "@tabler/icons-react";

// #region Components

/**
 * ThemeToggle renders a button that toggles the color scheme of the application
 * between light and dark modes, with a descriptive tooltip.
 *
 * @returns The action icon button with tooltips for theme toggling.
 */
export default function ThemeToggle(): React.JSX.Element {
    const { setColorScheme } = useMantineColorScheme();
    const colorScheme = useComputedColorScheme("light");

    return (
        <Tooltip
            label={
                colorScheme === "dark"
                    ? "Cambiar a modo claro"
                    : "Cambiar a modo oscuro"
            }
            withArrow
            position="left"
        >
            <ActionIcon
                variant="default"
                size="lg"
                onClick={() =>
                    setColorScheme(
                        colorScheme === "dark" ? "light" : "dark"
                    )
                }
            >
                {colorScheme === "dark" ? (
                    <IconSun size={18} />
                ) : (
                    <IconMoon size={18} />
                )}
            </ActionIcon>
        </Tooltip>
    );
}

// #endregion