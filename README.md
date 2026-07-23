# demo-typescript

# demo-test

- Install test dependencies
  - vitest — your test runner (same one you used for frontend, works for backend too — no separate tool needed).
  - supertest — lets you send fake HTTP requests to your Express app without actually starting a server on a real port.
  - @types/supertest — TypeScript types for supertest (supertest itself doesn't ship types).

```
npm install -D vitest supertest @types/supertest
```

- Add a test script

```
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "vitest"
}
```
