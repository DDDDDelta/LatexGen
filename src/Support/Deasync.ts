
import deasync from "deasync"

export function SyncAwait<T>(promise: Promise<T>): T {
  let done = false;
  let result: T | undefined;
  let error: any;

  promise
    .then((res) => {
      result = res;
      done = true;
    })
    .catch((err) => {
      error = err;
      done = true;
    });

  deasync.loopWhile(() => !done);

  if (error) { 
    throw error 
  };
  
  return result!;
}

export function SyncAwaitVoid(promise: Promise<void>): void {
  let done = false;
  let error: any;
  
  promise
    .then(() => {
      done = true;
    })
    .catch((err) => {
      error = err;
      done = true;
    });

  deasync.loopWhile(() => !done);

  if (error) { 
    throw error 
  };
}
