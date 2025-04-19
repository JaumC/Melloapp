export interface User {
    id?: string;
    name?: string;
    email?: string;
    tot_score?: string;
    competition?: string;
    nickname?: string;
    search_id?: string;
    profilePic?: string;
    password?: string;
    dareId?: string;
    friends?: string[];
}

export interface Dare {
    id?: string,
    name?: string;
    start_date?: string;
    end_date?: string;
    days?: string;
    weekend?: boolean;
    friends?: string[];
    host?: string;
    sequencyDay?: string;
    sequencyMounth?: string;
    streak?: string;
    finishedDare?: boolean;
  }