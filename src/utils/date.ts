// #region Functions

/**
 * Parses a World Cup match date string in either YYYY-MM-DD or DD-MM-YYYY format
 * into a standard Javascript Date object.
 *
 * @param date - The match date string.
 * @returns A Javascript Date object representing the match date.
 */
export function parseMatchDate(date: string): Date {
    const parts = date.split("-").map(Number);

    // YYYY-MM-DD format (used in modern records e.g. 2022-11-20)
    if (parts[0] > 1900) {
        const [year, month, day] = parts;
        return new Date(year, month - 1, day);
    }

    // DD-MM-YYYY format (used in older records)
    const [day, month, year] = parts;
    return new Date(year, month - 1, day);
}

// #endregion