import { readFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import ts from 'typescript';
const modules = new Map();
export function moduleUrl(file) {
  file = resolve(file);
  if (modules.has(file)) return modules.get(file);
  let js = file.endsWith('.json') ? `export default ${readFileSync(file, 'utf8')};`
    : ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  js = js.replace(/from ['"](\.[^'"]+)['"]/g, (_, path) => `from '${moduleUrl(resolve(dirname(file), path + (extname(path) ? '' : '.ts')))}'`);
  const url = `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`;
  modules.set(file, url);
  return url;
}
