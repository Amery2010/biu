interface Locals {
    [key: string]: string;
}
interface Vars {
    [key: string]: string;
}
interface I18n {
    locals: Locals;
    t(key: string, vars?: Vars): string;
}
declare class I18n {
    locals: Locals;
    constructor(locals: Locals);
}
export default I18n;
