export interface Match {
    world_cup_year: number;
    match_id: number;
    date: string;

    team1: string;
    team2: string;

    score1: number;
    score2: number;

    stage: string;
    stadium: string;
    city: string;
    group: string | null;

    attendance: number | null;

    obs: string | null;
}