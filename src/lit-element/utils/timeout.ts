export const timeout = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
