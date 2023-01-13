/* eslint-disable @typescript-eslint/no-explicit-any */

export const throttle = <A extends unknown[], R>(cb: (...args: A) => R, delay: number) => {
  let wait = false;

  return (...args: A) => {
    if (wait) {
      return;
    }

    cb(...args);

    wait = true;

    setTimeout(() => {
      wait = false;
    }, delay);
  };
};
