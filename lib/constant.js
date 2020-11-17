"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMIT_TYPES = void 0;
exports.COMMIT_TYPES = {
    feat: {
        name: 'feat',
        alias: 'f',
        description: 'Add new feature',
    },
    fix: {
        name: 'fix',
        alias: 'x',
        description: 'Fix bug, hotfix',
    },
    style: {
        name: 'style',
        alias: 's',
        description: 'Style modification, formatting etc.',
    },
    refactor: {
        name: 'refactor',
        alias: 'r',
        description: 'Refactor related',
    },
    perf: {
        name: 'perf',
        alias: 'p',
        description: 'Improve performance',
    },
    test: {
        name: 'test',
        alias: 't',
        description: 'Test related',
    },
    docs: {
        name: 'docs',
        alias: 'd',
        description: 'Document related',
    },
    merge: {
        name: 'merge',
        alias: 'mg',
        description: 'Branch merge',
    },
    revert: {
        name: 'revert',
        alias: 'rv',
        description: 'Branch revert',
    },
    build: {
        name: 'build',
        alias: 'b',
        description: 'Project build related',
    },
    chore: {
        name: 'chore',
        alias: 'c',
        description: 'Build configuration related',
    },
    other: {
        name: 'other',
        alias: 'o',
        description: 'Other modification',
    },
};
