/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    transform: {
                        react: {
                            runtime: 'automatic',
                        },
                    },
                },
            },
        ],
    },
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};
