declare type EnvType = 'dev' | 'rc' | 'prod' | 'develop' | 'release' | 'production';
declare function init(url: string): void;
/**
 * deployment project
 * @param env deployment environment, limited to `develop`, `release` and `production`, alias `dev`, `rc` and `prod`.
 * @param dateTpl tag date format template
 */
declare function deploy(env: EnvType, dateTpl?: string): Promise<void>;
declare const _default: {
    init: typeof init;
    run: typeof deploy;
};
export default _default;
