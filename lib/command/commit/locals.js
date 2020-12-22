"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var config_1 = require("./config");
var i18n_1 = tslib_1.__importDefault(require("../../helper/i18n"));
var locals = {
    'en-US': {
        commandDesc: 'commit command for git',
        featDesc: 'Add new features',
        fixDesc: 'Bug fix',
        styleDesc: 'Style modification, formatting, etc.',
        refactorDesc: 'Code refactoring related',
        perfDesc: 'Performance optimization related',
        testDesc: 'Test related',
        docsDesc: 'Document related',
        mergeDesc: 'Branch merge',
        revertDesc: 'Branch revert',
        buildDesc: 'Project build related',
        choreDesc: 'Project build configuration related',
        otherDesc: 'Other modifications',
        localStatusConfirm: 'Do you want to commit locally modified files?',
        localStatusWarning: 'please commit locally modified files or checkout first',
        commitSuccess: 'commit message successfully',
        currentBranchDesc: 'current branch is ',
        selectTypeMsg: 'Please choose a commit type.',
        inputScopeMsg: 'Please enter the commit scope.',
        inputDescMsg: 'Please enter the commit message',
        commitError: 'commit message is required!',
    },
    'zh-CN': {
        commandDesc: 'git 提交指令',
        featDesc: '添加新功能',
        fixDesc: '错误修复',
        styleDesc: '样式修改、格式化等',
        refactorDesc: '代码重构相关',
        perfDesc: '性能优化相关',
        testDesc: '测试相关',
        docsDesc: '文档相关',
        mergeDesc: '分支合并',
        revertDesc: '分支还原',
        buildDesc: '项目构建相关',
        choreDesc: '与构建配置相关',
        otherDesc: '其他修改',
        localStatusConfirm: '是否提交本地文件修改？',
        localStatusWarning: '请先处理本地文件修改或切换分支',
        commitSuccess: '信息提交成功',
        currentBranchDesc: '当前分支是 ',
        selectTypeMsg: '请选择提交类型。',
        inputScopeMsg: '请输入提交范围。',
        inputDescMsg: '请输入提交信息。',
        commitError: '必须填写提交信息！',
    },
};
exports.default = new i18n_1.default(Object.keys(locals).includes(config_1.lang) ? locals[config_1.lang] : locals['zh-CN']);
