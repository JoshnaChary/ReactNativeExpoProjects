/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // jest-expo's default ignore pattern doesn't cover every RN-ecosystem ESM dep we pull in,
  // so extend it with the packages this project uses that ship untranspiled sources.
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo|expo-.*|@expo/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|react-native-.*|@unimodules/.*|unimodules|sentry-expo|native-base|zustand|axios)/)",
  ],
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)", "<rootDir>/__tests__/**/*.test.(ts|tsx)"],
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    // Phase 1 scope: exclude presentational view layer, the root navigator, the
    // native entrypoint, and pure static Figma/mock layout snapshots.
    // These will be covered in Phase 2.
    "!src/view/**",
    "!src/navigation/AppNavigator.tsx",
    "!src/constants/figma*.ts",
    "!src/constants/*MockData.ts",
    "!src/constants/layout.ts",
    "!src/constants/messagingChatTheme.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text", "text-summary"],
};
