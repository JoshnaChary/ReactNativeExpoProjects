import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { patientPortalRepository } from "@/repository/patientPortalRepository";

describe("patientPortalRepository", () => {
  it("returns the mock portal summary", async () => {
    const summary = await patientPortalRepository.getSummary();
    expect(summary).toEqual(MOCK_PORTAL_SUMMARY);
  });
});
