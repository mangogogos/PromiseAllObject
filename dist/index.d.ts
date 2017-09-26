export declare type Resolvable<T> = Promise<T> | T;
export declare type SourceObject<Spec> = {
    [key in keyof Spec]: Resolvable<Spec[key]>;
};
export declare type DestinationObject<Spec> = {
    [key in keyof Spec]: Spec[key];
};
export declare type Destination<Spec> = Promise<DestinationObject<Spec>>;
declare global  {
    interface PromiseConstructor {
        allObj: <Spec>(source: SourceObject<Spec>) => Destination<Spec>;
    }
}
export declare function allObj<Spec>(source: SourceObject<Spec>): Destination<Spec>;
export {};
