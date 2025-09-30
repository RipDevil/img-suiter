export const debug =
    (isDebug = false) =>
    (...rest) => {
        isDebug && console.log("debug :>> ", ...rest);
    };
