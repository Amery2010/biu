"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMIT_TYPES = void 0;
var tslib_1 = require("tslib");
var locals_1 = tslib_1.__importDefault(require("./locals"));
exports.COMMIT_TYPES = {
    WIP: {
        name: 'WIP',
        alias: 'wip',
        description: locals_1.default.t('wipDesc'),
    },
    feat: {
        name: 'feat',
        alias: 'f',
        description: locals_1.default.t('featDesc'),
    },
    fix: {
        name: 'fix',
        alias: 'x',
        description: locals_1.default.t('fixDesc'),
    },
    style: {
        name: 'style',
        alias: 's',
        description: locals_1.default.t('styleDesc'),
    },
    refactor: {
        name: 'refactor',
        alias: 'r',
        description: locals_1.default.t('refactorDesc'),
    },
    perf: {
        name: 'perf',
        alias: 'p',
        description: locals_1.default.t('perfDesc'),
    },
    test: {
        name: 'test',
        alias: 't',
        description: locals_1.default.t('testDesc'),
    },
    docs: {
        name: 'docs',
        alias: 'd',
        description: locals_1.default.t('docsDesc'),
    },
    merge: {
        name: 'merge',
        alias: 'mg',
        description: locals_1.default.t('mergeDesc'),
    },
    revert: {
        name: 'revert',
        alias: 'rv',
        description: locals_1.default.t('revertDesc'),
    },
    build: {
        name: 'build',
        alias: 'b',
        description: locals_1.default.t('buildDesc'),
    },
    chore: {
        name: 'chore',
        alias: 'c',
        description: locals_1.default.t('choreDesc'),
    },
    other: {
        name: 'other',
        alias: 'o',
        description: locals_1.default.t('otherDesc'),
    },
};
