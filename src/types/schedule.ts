import { Member } from '@types';

export interface TimeTable {
    time: string;
}

export interface TimeMember extends Member {
    timeTables: TimeTable[];
}
