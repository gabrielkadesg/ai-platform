import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => {
  return uuidv4();
};

export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const getCurrentTimestamp = (): string => {
  return formatDate(new Date());
};
