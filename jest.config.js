module.exports = {
  rootDir: "src",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|csv)$":
      "identity-obj-proxy",
    "\\.(css)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "../node_modules/@testing-library/jest-dom/dist/index.js",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageDirectory: "../coverage",
  collectCoverage: true,
  collectCoverageFrom: ["./**/*.{ts,tsx}"],
  testPathIgnorePatterns: [
    "/index.tsx",
    "/serviceWorker.ts",
    "/react-app-env.d.ts",
  ],
  setupFiles: ["../jest.global.tsx"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/theme.ts",
    "src/environments",
    "src/shared",
  ],
};
