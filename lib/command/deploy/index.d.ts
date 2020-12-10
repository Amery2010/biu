import commander from 'commander';
import { defaultConfig } from './config';
declare type DeployConfig = typeof defaultConfig;
export default function (program: commander.Command, deployConfig?: DeployConfig): void;
export {};
