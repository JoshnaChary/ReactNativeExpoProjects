# patient-portal-mindoula

Expo + React Native app scaffolded with strict MVVM boundaries and platform-specific rendering:

- Web: dedicated layout component (`PatientPortalWebView`) for Figma-fidelity implementation
- Mobile: adapted UX component (`PatientPortalMobileView`) using stacked cards and bottom tabs

## Run

```bash
npm install
npm run web
npm run ios
npm run android
```

## Architecture

`src/`

- `model/` domain types
- `services/` API clients
- `repository/` data access abstraction
- `viewmodel/` UI state and async orchestration
- `view/` presentational screens and reusable components
- `navigation/` platform-aware app navigation
- `constants/` content/layout/navigation/API constants
- `theme/` design tokens
- `hooks/` shared hooks
- `utils/` pure helpers

## Figma MCP

MCP server config is defined in `mcp.json`.

Token files are centralized and ready for Figma token sync:

- `src/theme/colors.ts`
- `src/theme/typography.ts`
- `src/theme/spacing.ts`
- `src/theme/radius.ts`

## Current Integration Status

This environment can reach Figma URLs but Figma MCP token requests return `Unauthorized` without authenticated MCP credentials.

Once credentials are available, replace placeholder theme values with extracted token values from the specified file and node IDs.
