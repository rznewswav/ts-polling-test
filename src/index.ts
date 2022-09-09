import { config } from 'dotenv';
import { readFile } from 'fs/promises';

config();

const dateSoccer = await readFile('data/date-soccer-20220907.json').then(
  (e) =>
    JSON.parse(
      e.toString(),
    ) as typeof import('../data/date-soccer-20220907.json'),
);

const firstStage = dateSoccer.Stages[0];
const firstEvent = firstStage.Events[0];

console.dir(firstStage, { depth: 1 });
console.dir(firstEvent, { depth: 1 });

const match = await readFile('data/match-soccer-798187.json').then(
  (e) =>
    JSON.parse(
      e.toString(),
    ) as typeof import('../data/match-soccer-798187.json'),
);

console.dir(match, { depth: 2 });
