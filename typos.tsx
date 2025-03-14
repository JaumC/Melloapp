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
}

export interface Dare {
    id?: string,
    name?: string;
    startDate?: string;
    endDate?: string;
    days?: string;
    weekend?: boolean;
    friends?: string;
    sequencyDay?: string;
    sequencyMounth?: string;
    streak?: string;
    finishedDare?: boolean;
  }