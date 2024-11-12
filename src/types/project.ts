export interface Meeting {
    meetingId: string;
    name: string;
}

export interface ChildProject {
    id: string;
    name: string;
    childProjects: ChildProject[];
    meetings: Meeting[];
}

export interface Project {
    projectId: string;
    name: string;
    childProjects: ChildProject[];
    meetings: Meeting[];
}
