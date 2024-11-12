import axios from 'axios';
import { useAuthStore } from '@store';
import { Project, Meeting, ChildProject } from '../types';

const apiUrl = process.env.REACT_APP_BASE_URL;

interface Member {
    organizationId: number;
    role: 'OWNER' | 'MEMBER' | 'ADMIN';
    type: string;
}

interface ProjectRequest {
    projectName: string;
    members: Member[];
}

export const getProject = async (): Promise<Project[]> => {
    try {
        const { token } = useAuthStore.getState();
        const response = await axios.get<Project[]>(`${apiUrl}/api/project`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`project 목록 불러오기에 실패했습니다: ${error}`);
    }
};

export const createProject = async (): Promise<Project> => {
    try {
        const { token } = useAuthStore.getState();
        const response = await axios.post<Project>(
            `${apiUrl}/api/project/create`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`project 생성에 실패했습니다: ${error}`);
    }
};

export const createChildProject = async (
    projectID: string,
): Promise<Project> => {
    try {
        const { token } = useAuthStore.getState();
        const response = await axios.post<Project>(
            `${apiUrl}/api/project/${projectID}/create-child`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: { projectID },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`하위 project 생성에 실패했습니다: ${error}`);
    }
};

export const deleteProject = async (projectID: string): Promise<void> => {
    try {
        const { token } = useAuthStore.getState();
        const response = await axios.delete(
            `${apiUrl}/api/project/${projectID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: { projectID },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`project 삭제에 실패했습니다: ${error}`);
    }
};

export const exitProject = async (projectID: string): Promise<void> => {
    try {
        const { token } = useAuthStore.getState();
        const response = await axios.delete(
            `${apiUrl}/api/project/${projectID}/out`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: { projectID },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`project 나가기에 실패했습니다: ${error}`);
    }
};

export const modifyProject = async (
    projectID: string,
    data: ProjectRequest,
): Promise<string> => {
    try {
        const { token } = useAuthStore.getState();
        const response = await axios.post<string>(
            `${apiUrl}/api/project/${projectID}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: { projectID },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`프로젝트 정보 수정에 실패했습니다: ${error}`);
    }
};