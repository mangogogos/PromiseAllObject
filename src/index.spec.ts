import './index';

describe('Promise.allObj', function () {
    const obj = {
        a: 123,
        b: '456',
        c: {
            d: {
                e: '789',
            },
        },
        f: true,
        g: new Error(),
    };

    it('should be a function', function () {
        expect(typeof Promise.allObj).toEqual('function');
    });

    it('should accept an object of plain JS values', function (done) {
        Promise.allObj(obj)
            .then(function (val) {
                expect(val).toEqual(obj)
            })
            .catch(function (err) {
                expect(err).toBe('Promise should not reject');
            })
            .then(done);
    });

    it('should accept an object of resolved promises and then resolve', function (done) {
        Promise.allObj({
            a: Promise.resolve(123),
            b: Promise.resolve('456'),
            c: Promise.resolve({
                d: {
                    e: '789',
                },
            }),
            f: Promise.resolve(true),
            g: new Error(),
        })
            .then(function (val) {
                expect(val).toEqual(obj)
            })
            .catch(function (err) {
                expect(err).toBe('Promise should not reject');
            })
            .then(done);
    });

    it('should accept an object of pending promises and then resolve', function (done) {
        Promise.allObj({
            a: new Promise((resolve) => resolve(123)),
            b: new Promise((resolve) => resolve('456')),
            c: new Promise((resolve) => resolve({
                d: {
                    e: '789',
                },
            })),
            f: new Promise((resolve) => setTimeout(() => resolve(true), 100)),
            g: new Error(),
        })
            .then(function (val) {
                expect(val).toEqual(obj)
            })
            .catch(function (err) {
                expect(err).toBe('Promise should not reject');
            })
            .then(done);
    });

    it('should accept an object with a mix of Resolvable values and then resolve', function (done) {
        Promise.allObj({
            a: new Promise((resolve) => resolve(123)),
            b: '456',
            c: Promise.resolve({
                d: {
                    e: '789',
                },
            }),
            f: new Promise((resolve) => setTimeout(() => resolve(true), 100)),
            g: new Error(),
        })
            .then(function (val) {
                expect(val).toEqual(obj)
            })
            .catch(function (err) {
                expect(err).toBe('Promise should not reject');
            })
            .then(done);
    });

    describe('should reject when any sub-promises reject', function () {
        [
            {
                a: new Promise((resolve, reject) => reject('hello')),
            },
            {
                a: Promise.resolve(),
                b: Promise.reject('hello'),
            },
            {
                a: new Promise((resolve) => resolve()),
                b: new Promise((resolve, reject) => setTimeout(() => reject('hello'), 100)),
            }
        ].forEach(function (input, index) {
            it('. Input #' + index, function (done) {
                Promise.allObj(input)
                    .catch(function (err: any) {
                        expect(err).toEqual('hello')
                    })
                    .then(done);
            });
        })
    });
});
