import commander from 'commander';
import { defaultConfig } from './config';
declare type GitflowConfig = typeof defaultConfig;
export default function (program: commander.Command, gitflowConfig?: GitflowConfig): void;
export {};
