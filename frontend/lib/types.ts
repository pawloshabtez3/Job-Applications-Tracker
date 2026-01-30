export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export type Job = {
  _id: string;
  company: string;
  role: string;
  status: JobStatus;
  applicationDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiError = {
  message?: string;
  errors?: Array<{ msg: string; param?: string }>;
};
