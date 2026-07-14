export function parseMatchDate(date: string): Date {
    const parts = date.split("-").map(Number);

    // YYYY-MM-DD
    if (parts[0] > 1900) {
        const [year, month, day] = parts;
        return new Date(year, month - 1, day);
    }

    // DD-MM-YYYY
    const [day, month, year] = parts;
    return new Date(year, month - 1, day);
}