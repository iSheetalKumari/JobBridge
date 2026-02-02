import { WorkOS } from "@workos-inc/node";

let workos: WorkOS | null = null;

export function getWorkos() {
  if (!process.env.WORKOS_API_KEY) {
    throw new Error("WORKOS_API_KEY is missing");
  }

  if (!workos) {
    workos = new WorkOS(process.env.WORKOS_API_KEY);
  }

  return workos;
}
