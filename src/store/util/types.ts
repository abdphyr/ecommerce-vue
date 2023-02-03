import { Ref } from "vue";

export interface IState<A, O> {
  isLng: boolean;
  isErr: boolean;
  err: string;
  expired: boolean;
  all: A[];
  one: O;
}

export type IStateRef<A, O> = Ref<IState<A, O>>

export interface IMutateOptions<O> {
  onSuccess?: (data: O) => void,
  onError?: (err: any) => void
}
  