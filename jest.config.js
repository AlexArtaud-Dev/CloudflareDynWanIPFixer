module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ]
};
