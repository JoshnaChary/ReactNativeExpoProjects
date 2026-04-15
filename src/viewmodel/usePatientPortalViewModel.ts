import { PORTAL_COPY } from "@/constants/copy";
import { PatientPortalSummary } from "@/model/PatientPortalSummary";
import { patientPortalRepository } from "@/repository/patientPortalRepository";
import { create } from "zustand";

type PortalViewState = {
  summary: PatientPortalSummary | null;
  isLoading: boolean;
  errorMessage: string | null;
};

type PortalViewActions = {
  load: () => Promise<void>;
};

type PortalStore = PortalViewState & PortalViewActions;

const initialState: PortalViewState = {
  summary: null,
  isLoading: false,
  errorMessage: null,
};

const usePortalStore = create<PortalStore>((set) => ({
  ...initialState,
  load: async () => {
    set({
      isLoading: true,
      errorMessage: null,
    });

    try {
      const summary = await patientPortalRepository.getSummary();

      set({
        summary,
        isLoading: false,
      });
    } catch {
      set({
        isLoading: false,
        errorMessage: PORTAL_COPY.error,
      });
    }
  },
}));

export const usePatientPortalViewModel = () => {
  const summary = usePortalStore((state) => state.summary);
  const isLoading = usePortalStore((state) => state.isLoading);
  const errorMessage = usePortalStore((state) => state.errorMessage);
  const load = usePortalStore((state) => state.load);

  return {
    summary,
    isLoading,
    errorMessage,
    load,
  };
};
