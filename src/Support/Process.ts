import panic from "./Panic";

function OnExit(): void {
  process.on("exit", (code) => {
    console.log(`Exiting with code: ${code}`);
  });
}

export function getProcEnvNoFail(name: string): string {
  let res = process.env[name];
  if (res) {
    return res;
  }
  else {
    panic();
  }
}

export function InvokeMain(main: (argv: string[]) => number): void {
  OnExit();
  process.exit(main(process.argv.slice(2)));
}
