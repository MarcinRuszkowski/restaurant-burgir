import { create } from "zustand";
import { Alert, AlertStatus } from "../types/types";

interface AlertState {
  alert: Alert | null;
  showAlert: (status: AlertStatus, message: string) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alert: null,
  showAlert: (status, message) => {
    set({ alert: { status, message } });
    setTimeout(() => {
      set({ alert: null });
    }, 3000);
  },
}));
