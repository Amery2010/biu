declare type EnvType = 'dev' | 'rc' | 'prod' | 'develop' | 'release' | 'production';
/**
 * deployment project
 * @param env deployment environment, limited to `develop`, `release` and `production`, alias `dev`, `rc` and `prod`.
 * @param dateTpl tag date format template
 */
declare function deploy(env: EnvType, dateTpl?: string): Promise<void>;
export default deploy;
