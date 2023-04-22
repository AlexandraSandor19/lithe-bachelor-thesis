import { useAuthStore } from "../stores/auth";

export const authentication = {
  async install() {
    const store = useAuthStore();

    try {
      await store.attemptForUser();
      return;
    } catch (error) {
      return;
    }
  }
}