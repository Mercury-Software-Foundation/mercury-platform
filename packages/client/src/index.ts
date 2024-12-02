import { create, UseBoundStore, StoreApi } from "zustand";
import { useState, useEffect } from "react";

type UserData = {
  name: string;
  email: string;
};
export function useFetchUserData(query: any) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await query;
        if (!response) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const data = (await response.json()) as UserData;
        setUserData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [userData, isLoading, error];
}

export function useLazyFetchUserData(query: any): any {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const cb = async () => {
    setIsLoading(true);
    try {
      const response = await query();
      console.log("res", response);
      if (!response) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }
      const data = {} as UserData;
      setUserData(data);
      setError(undefined);
    } catch (error: any) {
      setUserData(undefined);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [userData, isLoading, error, cb];
}

const useCounter = create()((set) => ({
  count: 1,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
  late: async () =>
    await new Promise((res, rej) =>
      setTimeout(() => {
        res(false);
      }, 1000)
    ),
}));

type DynamicMethodsInterface<T extends string, K> = {
  [key in
    | `${T}List`
    | `${T}`
    | `update${T}`
    | `add${T}`]: key extends `${T}List`
    ? () => void
    : key extends T
      ? UseBoundStore<StoreApi<K>>
      : never;
};

type Store = {
  count: number;
  inc: () => void;
  late: () => Promise<Boolean>;
};
class DynamicMethods<T extends string, K> {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
    //@ts-ignore
    this[`${name}`] = useCounter;
  }
  public getDynamicMethods(): DynamicMethodsInterface<T, K> {
    return this as DynamicMethodsInterface<T, K>;
  }
}

class Client {
  Model<T extends string, K>(name: string) {
    return new DynamicMethods<T, K>(name).getDynamicMethods();
  }
}

export default Client;
