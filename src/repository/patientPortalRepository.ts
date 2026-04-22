import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { PatientPortalSummary } from "@/model/PatientPortalSummary";

export type PatientPortalRepository = {
  getSummary: () => Promise<PatientPortalSummary>;
};

class PatientPortalRepositoryImpl implements PatientPortalRepository {
  async getSummary(): Promise<PatientPortalSummary> {
    return MOCK_PORTAL_SUMMARY;
  }
}

export const patientPortalRepository: PatientPortalRepository =
  new PatientPortalRepositoryImpl();
