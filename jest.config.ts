import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest", // Tells Jest to use ts-jest for TypeScript files
    testEnvironment: "jest-environment-jsdom", // Sets up a DOM-like environment
    // ... other necessary configurations (transforms, moduleNameMapper for CSS/assets, setupFilesAfterEnv)
};

export default config;

export const testEnvironment = "jsdom";
export const transform = {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
};

export const setupFilesAfterEnv = ["<rootDir>/setupTests.js"];