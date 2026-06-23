# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm start            # start Expo dev server (scan QR with Expo Go)
npm run android      # start targeting Android emulator
npm run ios          # start targeting iOS simulator
npm run lint         # run Expo linter
npm test             # run Jest in watch mode
```

Run a single test file:
```bash
npx jest path/to/file.test.tsx
```

## Architecture

### Navigation (Expo Router — file-based)

Three nested navigator layers defined by the `app/` directory:

```
Stack (root)
├── index.tsx              → Login screen (unauthenticated entry)
├── cadastro.tsx           → Registration
├── recuperarSenha.tsx     → Password recovery
├── dare/[id].tsx          → Individual dare detail + ranking
├── editarDesafio/[id].tsx → Edit an existing dare
├── (drawer)/              → Authenticated shell with side drawer
│   ├── home.tsx           → Dashboard: lists user's dares
│   └── (tabs)/            → Tab navigator nested inside drawer
│       ├── cadastrarDesafio.tsx
│       ├── adicionarCompetidor.tsx
│       ├── meusAmigos.tsx
│       └── historicoDesafio.tsx
└── (stack)/               → Profile stack (white header, no shadow)
    ├── perfil.tsx
    └── editPerfil.tsx
```

The `(tabs)` group sits inside `(drawer)`, making those screens accessible from both the drawer and the bottom tab bar simultaneously.

### Global State — Context API

All state lives in `contexts/`. The root wrapper is `contexts/GlobalContext.tsx`, which composes four providers in this order (outermost first):

1. **FontsSession** (`FontsProvider`) — loads `CormorantSC_400Regular` and `Roboto_100Thin`; renders `null` until fonts are ready.
2. **LoadingSession** (`LoadingProvider`) — global overlay loading state (`loading`, `bgVisible`).
3. **UserSession** (`UserProvider`) — authenticated user object + all user API operations. On mount, checks `expo-secure-store` for a persisted `token`/`user_data` and redirects to `/home` if found.
4. **DareSession** (`DareProvider`) — dare list state + all dare API operations. Depends on `UserProvider` and `LoadingProvider`.

Consume context via the named hooks each provider exports:

```ts
import { userHook }    from '@/contexts/Providers/UserProvider';
import { dareHook }    from '@/contexts/Providers/DareProvider';
import { loadingHook } from '@/contexts/Providers/LoadingProvider';
import { fontsHook }   from '@/contexts/Providers/FontsProvider';
```

### API Layer

- **Base URL**: `utils/Constants.tsx` exports `API_URL` — this is the authoritative source used by `AxiosInstance`. Do not use `utils/API_URL.tsx` (duplicate file with a different hardcoded IP, likely stale).
- **`AxiosInstance`** (`app/axios/AxiosInstance.tsx`): pre-configured axios instance with `baseURL` and `withCredentials: true`. Use this for all new requests in `UserProvider`-style code.
- **`AxiosCatchError`** (`app/axios/AxiosCatchError.tsx`): standard `catch` handler — passes structured API errors to `notifyApiToast`, falls back to a generic message.
- **`DareProvider`** currently calls `axios` directly instead of `AxiosInstance` — prefer `AxiosInstance` for consistency when editing that file.

Backend responses always follow `ApiResponse<T>` from `utils/Typos.tsx`:
```ts
{ type: string; title: string; message: string; content?: T }
```

Show API feedback with:
```ts
notifyApiToast(response.data)       // from an ApiAxiosResponse
notifyToast("error", "Título", "Mensagem")  // manual toast
```

### Styling

NativeWind v4 (Tailwind for React Native) with `global.css` imported in `app/_layout.tsx`. Custom font utilities are configured in `tailwind.config.js`:

- `font-cormorantSC` — display/brand text (titles, the "MELLO" logo)
- `font-robotoThin` — body text, labels

Hardcoded hex colors used throughout (not Tailwind variables): `#fafafa` (background), `#C4A59D` (header), `#A3BBA3` (accent green), `#004C72` (links).

### Types

All shared interfaces are in `utils/Typos.tsx`: `User`, `Dare`, `DayPoint`, `DayEntry`, `ApiResponse`, `ApiAxiosResponse`, `ApiAxiosError`.

`DareWithDayPoints` is the primary list item shape returned by `readDare` — it pairs a `Dare` with its `DayPoint` map (`{ days: { [date]: DayEntry[] } }`).

### Auth Persistence

Login saves `token` and `user_data` (JSON-serialised `User`) via `expo-secure-store`. `UserProvider` reads these on mount. Logout deletes both keys and clears context state.
