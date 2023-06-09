// Ref: https://github.com/microsoft/vscode/pull/178179/files
// Todo: this file is not needed if the PR above got merged.

import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { run } from 'shell-commands';

const baseDir = join('.', 'node_modules', 'monaco-editor', 'esm', 'vs');
const filePath = join(baseDir, 'base', 'common', 'marked', 'marked.js');
const content = readFileSync(filePath, 'utf-8');
const lines = content.split('\n');
const index = lines.findIndex(
  (line) => line.trim() === "typeof define === 'function' && define.amd ? define(['exports'], factory) :",
);
const temp = lines[index - 1];
lines[index - 1] = lines[index];
lines[index] = temp;
writeFileSync(filePath, lines.join('\n'));

run(`yarn parcel build ${join(baseDir, 'language', 'typescript', 'ts.worker.js')} --dist-dir docs`);
