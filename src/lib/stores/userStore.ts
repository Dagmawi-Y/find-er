import { writable } from "svelte/store";

interface User {
  isAuthenticated: boolean;
  role: string;
  id: any; // Add a new property for userId
}

interface UserStore {
  user: User;
  loading: boolean;
}

const defaultUser: User = {
  isAuthenticated: false,
  role: "",
  id: 0, // Set the default value to null
};

const getUserFromSessionStorage = (): User => {
  if (typeof sessionStorage !== "undefined") {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      console.log("----------", JSON.parse(storedUser));
      return JSON.parse(storedUser);
    }
  }
  return defaultUser;
};

const initialUserStore: UserStore = {
  user: getUserFromSessionStorage(),
  loading: true,
};

export const userStore = writable<UserStore>(initialUserStore);

if (typeof sessionStorage !== "undefined") {
  const storedUser = getUserFromSessionStorage();
  userStore.update((state) => ({
    ...state,
    user: storedUser,
    loading: false,
  }));
}

userStore.subscribe((state) => {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(state.user));
  }
});
