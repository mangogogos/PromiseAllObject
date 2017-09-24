type Resolvable<T> = Promise<T> | T;
type SourceObject<Spec> = {
    [key in keyof Spec]: Resolvable<Spec[key]>
}
type DestinationObject<Spec> = {
    [key in keyof Spec]: Spec[key]
}
type Destination<Spec> = Promise<DestinationObject<Spec>>;

declare global {
    interface PromiseConstructor {
        allObj: <Spec>(source: SourceObject<Spec>) => Destination<Spec>
    }
}

export function allObj<Spec>(source: SourceObject<Spec>): Destination<Spec> {
    const sourceKeys = Object.keys(source) as (keyof SourceObject<Spec>)[];
    const sourceValues = sourceKeys.map(sourceKey => source[sourceKey]);

    return Promise.all(sourceValues)
        .then((values: Spec[keyof Spec][]) => {
            const destination = {} as DestinationObject<Spec>;
            sourceKeys.forEach((key: keyof Spec, i: number) => {
                destination[key] = values[i];
            });
            return destination;
        });
}

(Promise as PromiseConstructor).allObj = allObj;
