import { getTypeByName } from '../services/type.api';
import { useQuery } from '@tanstack/react-query';

export const useGetTypeByName = (name: string) =>
  useQuery({ queryKey: ['getTypeByName', name], queryFn: async () => getTypeByName(name), enabled: !!name });
