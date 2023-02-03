import { ref, computed } from "vue";
import { ax } from "./axios";
import { IMutateOptions, IState, IStateRef } from "./types";

export class ApiCrudStore {
  public static createState<A, O = A>() {
    return ref<IState<A, O>>({
      isLng: true,
      isErr: false,
      err: "",
      expired: false,
      all: [],
      one: {} as O
    })
  }

  public static getAll<A, O = A>(endpoint: string, state: IStateRef<A, O>) {
    if (state.value.all.length === 0 || state.value.expired) {
      state.value.isLng = true;
      ax.get<A[]>(endpoint)
        .then((res) => {
          state.value.all = res.data;
          state.value.isLng = false;
        })
        .catch((error) => {
          state.value.err = error.message;
          state.value.isErr = true;
          state.value.isLng = false;
        })
      state.value.expired = false;
    }
    return {
      data: computed(() => state.value.all),
      ...this.returner<A, O>(state)
    };
  }

  public static getOne<A, O = A>(endpoint: string, param: number, state: IStateRef<A, O>) {
    state.value.isLng = true;
    ax.get<O>(endpoint + "/" + param)
      .then((res) => {
        state.value.one = res.data;
        state.value.isLng = false;
      })
      .catch((error) => {
        state.value.err = error.message;
        state.value.isErr = true;
        state.value.isLng = false;
      })
    return {
      data: computed(() => state.value.one),
      ...this.returner<A, O>(state)
    };
  }

  public static create<A, Dto, O = A>(endpoint: string, state: IStateRef<A, O>) {
    function mutate(data: Dto, options?: IMutateOptions<O>) {
      state.value.isLng = true;
      ax.post<O>(endpoint, data)
        .then((res) => {
          state.value.one = res.data;
          state.value.expired = true;
          state.value.isLng = false;
          options?.onSuccess && options.onSuccess(res.data);
        })
        .catch((error) => {
          state.value.err = error.message;
          state.value.isErr = true;
          state.value.isLng = false;
          options?.onError && options.onError(error.message);
        })
    }
    return {
      mutate,
      data: computed(() => state.value.one),
      ...this.returner<A, O>(state)
    };
  }

  public static update<A, Dto, O = A>(endpoint: string, param: number, state: IStateRef<A, O>) {
    function mutate(data: Dto, options?: IMutateOptions<O>) {
      state.value.isLng = true;
      ax.put<O>(endpoint + "/" + param, data)
        .then((res) => {
          state.value.one = res.data;
          state.value.isLng = false;
          options?.onSuccess && options.onSuccess(res.data);
        })
        .catch((error) => {
          state.value.err = error.message;
          state.value.isErr = true;
          state.value.isLng = false;
          options?.onError && options.onError(error.message);
        })
    }
    return {
      mutate,
      data: computed(() => state.value.one),
      ...this.returner<A, O>(state)
    };
  }

  public static delete<A, O = A>(endpoint: string, param: number, state: IStateRef<A, O>) {
    function mutate(options?: IMutateOptions<O>) {
      state.value.isLng = true;
      ax.delete<O>(endpoint + "/" + param)
        .then((res) => {
          state.value.one = res.data;
          state.value.isLng = false;
          options?.onSuccess && options.onSuccess(res.data);
        })
        .catch((error) => {
          state.value.err = error.message;
          state.value.isErr = true;
          state.value.isLng = false;
          options?.onError && options.onError(error.message);
        })
    }
    return {
      mutate,
      data: computed(() => state.value.one),
      ...this.returner<A, O>(state)
    };
  }

  private static returner<A, O = A>(state: IStateRef<A, O>) {
    return {
      isLng: computed(() => state.value.isLng),
      isErr: computed(() => state.value.isErr),
      err: computed(() => state.value.err)
    }
  }
}