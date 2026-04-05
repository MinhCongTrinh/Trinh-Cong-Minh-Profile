import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const CONFIG_YAML = path.join(ROOT, 'config.yaml');
const TARGET_TS = path.join(ROOT, 'src', 'lib', 'data.ts');

try {
  const config = yaml.load(fs.readFileSync(CONFIG_YAML, 'utf8'));
  
  const content = `// This file is auto-generated from config.yaml. Do not edit directly.
export const siteConfig = ${JSON.stringify(config.site, null, 2)};
export const projects = ${JSON.stringify(config.projects, null, 2)};
export const experience = ${JSON.stringify(config.experience, null, 2)};
export const education = ${JSON.stringify(config.education, null, 2)};
export const awards = ${JSON.stringify(config.awards, null, 2)};
export const skills = ${JSON.stringify(config.skills, null, 2)};
export const about_details = ${JSON.stringify(config.about_details || [], null, 2)};
export const music = ${JSON.stringify(config.music || null, null, 2)};
export const contact_link = ${JSON.stringify(config.contact_link || null, null, 2)};
`;

  fs.writeFileSync(TARGET_TS, content);
  console.log('✅ Synchronized config.yaml to src/lib/data.ts');
} catch (e) {
  console.error('❌ Failed to sync config.yaml:', e);
}
