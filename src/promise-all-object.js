export function allObj(source) {
    const sourceKeys = Object.keys(source);
    const sourceValues = sourceKeys.map(sourceKey => source[sourceKey]);
    return Promise.all(sourceValues)
        .then((values) => {
        const destination = {};
        sourceKeys.forEach((key, i) => {
            destination[key] = values[i];
        });
        return destination;
    });
}
Promise.allObj = allObj;
//# sourceMappingURL=promise-all-object.js.map