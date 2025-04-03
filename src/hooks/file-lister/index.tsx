import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { APIDecoratorWithBaseURI } from '../../service';

export interface TrackerResponse {
  files: any;
  filesLoading: boolean;
  filesError: string | null;
}

export const useGetCandidateFiles = (): TrackerResponse => {
  const url: string = '/v1/file-manager/list/candidate';
  const fetchData = async (): Promise<AxiosResponse> => {
    return await APIDecoratorWithBaseURI().get(url);
  };

  const { data, error, isLoading } = useSWR<any>(url, fetchData);
  const nestedData = useMemo(() => data?.data?.data || {}, [data]);

  const memoizedValue = useMemo(
    () => ({
      files: nestedData,
      filesLoading: isLoading,
      filesError: error,
    }),
    [nestedData, error, isLoading]
  );

  return memoizedValue;
};
