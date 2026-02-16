import client from './client';
import type { User } from '../types/user';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'medlink_users_mock';

// Mock data
const initialMockData: User[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@apollo.com', phone: '9876543210', address: 'Delhi, India' },
    { id: '2', firstName: 'Sarah', lastName: 'Smith', email: 'sarah@fortis.com', phone: '9123456780', address: 'Mumbai, India' }
];

const getLocalUsers = (): User[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockData));
        return initialMockData;
    }
    return JSON.parse(data);
};

const saveLocalUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await client.get<User[]>('/users');
        return response.data;
    } catch (err) {
        // Fallback for demo/production where json-server isn't running
        return getLocalUsers();
    }
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    try {
        const response = await client.post<User>('/users', user);
        return response.data;
    } catch (err) {
        const users = getLocalUsers();
        const newUser = { ...user, id: uuidv4() } as User;
        users.push(newUser);
        saveLocalUsers(users);
        return newUser;
    }
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    try {
        const response = await client.put<User>(`/users/${id}`, user);
        return response.data;
    } catch (err) {
        const users = getLocalUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...user };
            saveLocalUsers(users);
            return users[index];
        }
        throw new Error('User not found');
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await client.delete(`/users/${id}`);
    } catch (err) {
        const users = getLocalUsers();
        const filtered = users.filter(u => u.id !== id);
        saveLocalUsers(filtered);
    }
};
