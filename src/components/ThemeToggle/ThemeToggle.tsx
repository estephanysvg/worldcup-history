import {
    ActionIcon,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
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