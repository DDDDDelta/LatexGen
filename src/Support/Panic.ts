let PanicError: Error | null = null;

export function GetPanicError(): Error | null {
  return PanicError;
}

export default function panic(error?: Error): never {
  if (error) {
    PanicError = error;
  }
  else {
    PanicError = new Error("Panic");
  }

  process.exit(1);
}
