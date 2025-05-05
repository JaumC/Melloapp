export interface User {
    id: string;
    name?: string;
    email?: string;
    tot_score?: string;
    competition?: string;
    nickname?: string;
    search_id?: string;
    profilePic?: string;
    password?: string;
    color?: string;
    friends?: string[];
}

export interface DareWithDayPoints {
    dare: Dare;
    dayPoints: DayPoint;
}

export interface Dare {
    _id?: string,
    name?: string;
    start_date?: string;
    end_date?: string;
    days?: string;
    weekend?: boolean;
    challengers?: string[];
    host?: string;
    day_sequency?: string;
    mounth_sequency?: string;
    streak?: number;
    finishedDare?: boolean;
}

export interface DayPoint {
    days: {
        [date: string]: DayEntry[];
    };
}

export interface DayEntry {
    user_id: string;
    marked_at: Date;
    points: number;
}
