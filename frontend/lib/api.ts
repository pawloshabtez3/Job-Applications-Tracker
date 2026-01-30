import type { Job, JobStatus, ApiError } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    let error: ApiError = { message: 'Request failed' };
    try {
      error = await res.json();
    } catch {
      // ignore
    }
    throw error;
  }
  return res.json();
};

export const authApi = {
  register: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },
  logout: async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return handleResponse(res);
  }
};

export const jobsApi = {
  create: async (payload: {
    company: string;
    role: string;
    status: JobStatus;
    applicationDate?: string;
    notes?: string;
  }) => {
    const res = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    return handleResponse<{ job: Job }>(res);
  },
  update: async (id: string, payload: {
    company: string;
    role: string;
    status: JobStatus;
    applicationDate?: string;
    notes?: string;
  }) => {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    return handleResponse<{ job: Job }>(res);
  },
  remove: async (id: string) => {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    return handleResponse(res);
  }
};
