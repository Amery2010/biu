"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var config_1 = require("./config");
var i18n_1 = tslib_1.__importDefault(require("../../helper/i18n"));
var locals = {
    'en-US': {
        commandDesc: 'create gitflow',
        subCommandDesc: '{{prefix}}/ branch name prefix',
        checkoutBranch: 'checkout the "{{target}}" branch...',
        checkoutBranchSuccess: 'checkout the "{{target}}" branch successfully.',
        mergeBranch: 'merge the "{{source}}" branch to "{{target}}" branch...',
        mergeBranchSuccess: 'merged the "{{source}}" branch to "{{target}}" branch.',
        mergeBranchError: 'an error occurred while merging the "{{source}}" branch to "{{target}}" branch!',
        cleanBranch: 'clean the "{{branchName}}" branch...',
        cleanBranchSuccess: 'clean the "{{branchName}}" branch successfully.',
        pushTag: 'create and push tag to {{upstream}}...',
        pushTahSuccess: 'tag {{tagName}} was pushed successfully.',
        initRepo: 'the current repository initialized successfully.',
        initRepoWarning: 'the current repository has been initialized',
        missingBranchName: 'Missing branch name!',
        unknownType: 'unknown type "{{type}}"',
        selectGitflowType: 'Please choose a gitflow type.',
        inputBranchName: 'Please enter the branch name.',
        finishedWorkflow: 'finished the {{type}} workflow successfully.',
        selectFinishedBranch: 'Please choose the completed branch.',
        unknownMode: 'unknown mode "{{mode}}"',
        selectGitflowMode: 'Please choose a gitflow mode.',
    },
    'zh-CN': {
        commandDesc: '创建 gitflow 工作流',
        subCommandDesc: '{{prefix}}/ 前缀的分支名',
        checkoutBranch: '正在切换 "{{target}}" 分支...',
        checkoutBranchSuccess: '切换 "{{target}}" 分支成功。',
        mergeBranch: '正在将 "{{source}}" 分支合并到 "{{target}}" 分支...',
        mergeBranchSuccess: '"{{source}}" 分支成功合并到 "{{target}}" 分支。',
        mergeBranchError: '将 "{{source}}" 分支合并到 "{{target}}" 分支过程中发生了错误！',
        cleanBranch: '正在清理 "{{branchName}}" 分支...',
        cleanBranchSuccess: '成功清理 "{{branchName}}" 分支。',
        pushTag: '创建并推送 tag 到 {{upstream}}...',
        pushTahSuccess: 'tag {{tagName}} 推送成功。',
        initRepo: '成功初始化当前仓库。',
        initRepoWarning: '当前仓库已经初始化。',
        missingBranchName: '分支名缺失！',
        unknownType: '未知类型 "{{type}}"',
        selectGitflowType: '请选择 gitflow 类型。',
        inputBranchName: '请输入分支名称。',
        finishedWorkflow: '完成 {{type}} 工作流。',
        selectFinishedBranch: '请选择已完成的分支。',
        unknownMode: '未知模式 "{{mode}}"',
        selectGitflowMode: '请选择 gitflow 模式。',
    },
};
exports.default = new i18n_1.default(Object.keys(locals).includes(config_1.lang) ? locals[config_1.lang] : locals['zh-CN']);