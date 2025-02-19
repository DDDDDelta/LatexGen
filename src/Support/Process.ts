function OnExit(): void {
  process.on("exit", (code) => {
    console.log(`Exiting with code: ${code}`);
  });
}

export function RunMain(main: (argv: string[]) => number): void {
  OnExit();
  process.exit(main(process.argv.slice(2)));
}
