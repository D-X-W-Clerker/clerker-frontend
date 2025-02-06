export interface ProjectMember {
    organizationId: string;
    username: string;
    email: string;
    type: string | null;
    role: string;
}

export interface Emails {
    emails: string[];
}

export interface Notification {
    notificationId: string;
    content: string;
    createdAt: string;
}
