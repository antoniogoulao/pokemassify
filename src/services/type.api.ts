import { axiosInstance } from './axios';
import { TypeDetailsResponse } from '../types/type';

export const getTypeByName = async (name: string) => {
  const resp = await axiosInstance.get<TypeDetailsResponse>(`/api/v2/type/${name}`);
  return resp.data;
};
