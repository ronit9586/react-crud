/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import {
  QueryClient,
  DefaultOptions,
  UseQueryOptions,
  UseMutationOptions,
} from "react-query";

const queryConfig: DefaultOptions = {
  queries: {
    // useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<Awaited<ReturnType<QueryFnType>>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<MutationFnType>>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >;
