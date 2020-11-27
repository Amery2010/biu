interface CommitType {
    name: string;
    alias: string;
    description: string;
}
interface CommitTypes {
    [type: string]: CommitType;
}
export declare const COMMIT_TYPES: CommitTypes;
export {};
