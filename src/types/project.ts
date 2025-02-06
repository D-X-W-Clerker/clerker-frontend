import { BasicMeetingInfo, Member } from '@types';

export interface ProjectMember extends Member {
    organizationId: string;
}

export interface ChildProject {
    id: string;
    name: string;
    childProjects: ChildProject[];
    meetings: BasicMeetingInfo[];
}

export interface Project {
    projectId: string;
    name: string;
    childProjects: ChildProject[];
    meetings: BasicMeetingInfo[];
}

export interface ProjectInfo {
    projectName: string;
    members: ProjectMember[];
}
