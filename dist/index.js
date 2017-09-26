"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function allObj(source) {
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
exports.allObj = allObj;
Promise.allObj = allObj;
//# sourceMappingURL=index.js.map