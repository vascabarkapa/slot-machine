import { config } from 'dotenv';
config();

const { PORT, API_URL, FRONT_URL } = process.env;

export const port = PORT || 5001;
export const apiUrl = API_URL;
export const frontUrl = FRONT_URL;
export const prefix = '/api';