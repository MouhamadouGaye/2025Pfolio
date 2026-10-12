import { parseCSV } from "../utils/csv";
import type { GreetingMap, Topic } from "../types";

export async function loadTopics(): Promise<Topic[]> {
  const res = await fetch("/data/topics.csv");
  if (!res.ok) throw new Error(`topics.csv introuvable (${res.status})`);

  return parseCSV(await res.text()).map((row) => ({
    id: row.id,
    category: row.category,
    title: row.title,
    description: row.description,
    prompt_system: row.prompt_system,
    icon: row.icon,
    color: row.color,
  }));
}

export async function loadGreetings(): Promise<GreetingMap> {
  const res = await fetch("/data/greetings.csv");
  if (!res.ok) throw new Error(`greetings.csv introuvable (${res.status})`);

  return parseCSV(await res.text()).reduce<GreetingMap>((acc, row) => {
    acc[row.trigger.toLowerCase()] = row.response;
    return acc;
  }, {});
}

export function findGreeting(
  message: string,
  greetings: GreetingMap,
): string | null {
  const lower = message.toLowerCase();
  for (const [trigger, response] of Object.entries(greetings)) {
    if (new RegExp(`\\b${trigger}\\b`, "i").test(lower)) return response;
  }
  return null;
}
