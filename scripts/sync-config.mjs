import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const CONFIG_YAML = path.join(ROOT, 'config.yaml');
const TARGET_TS = path.join(ROOT, 'src', 'lib', 'data.ts');

function cleanData(obj) {
  if (Array.isArray(obj)) {
    return obj
      .filter(item => item !== null && item !== undefined && item !== '')
      .map(cleanData);
  } else if (typeof obj === 'object' && obj !== null) {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = cleanData(value);
    }
    return cleaned;
  }
  return obj;
}

try {
  let config = yaml.load(fs.readFileSync(CONFIG_YAML, 'utf8'));
  config = cleanData(config);
  
  fs.mkdirSync(path.dirname(TARGET_TS), { recursive: true });
  
  const content = `// This file is auto-generated from config.yaml. Do not edit directly.

export interface SiteConfig {
  name?: string;
  username?: string;
  bio?: string;
  about_title?: string;
  about_summary?: string;
  avatar?: string;
  location?: string;
  company?: string;
  email?: string;
  website?: string;
  github?: string;
  youtube?: string;
  achievements?: Array<{ emoji: string; title: string; [key: string]: any }>;
  [key: string]: any;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  slug?: string;
  image?: string;
  link?: string;
  [key: string]: any;
}

export interface Experience {
  id: string;
  title: string;
  role: string;
  date: string;
  points?: string[];
  [key: string]: any;
}

export interface Education {
  school?: string;
  date?: string;
  stats?: string[];
  [key: string]: any;
}

export interface AboutDetail {
  title: string;
  icon?: string;
  type?: string;
  content?: string;
  items?: Array<{ title: string; description?: string; [key: string]: any }>;
  [key: string]: any;
}

export interface MusicTrack {
  id: string;
  title: string;
  badge?: string;
  description?: string;
  src?: string;
  [key: string]: any;
}

export interface MusicData {
  featuredTrack?: MusicTrack;
  musicTracks?: MusicTrack[];
  [key: string]: any;
}

export const siteConfig: SiteConfig = ${JSON.stringify(config.site || {}, null, 2)};
export const projects: Project[] = ${JSON.stringify(config.projects || [], null, 2)};
export const experience: Experience[] = ${JSON.stringify(config.experience || [], null, 2)};
export const education: Education = ${JSON.stringify(config.education || {}, null, 2)};
export const awards: string[] = ${JSON.stringify(config.awards || [], null, 2)};
export const skills: string[] = ${JSON.stringify(config.skills || [], null, 2)};
export const about_details: AboutDetail[] = ${JSON.stringify(config.about_details || [], null, 2)};
export const music: MusicData | null = ${JSON.stringify(config.music || null, null, 2)};
export const contact_link: string | null = ${JSON.stringify(config.contact_link || null, null, 2)};
`;

  fs.writeFileSync(TARGET_TS, content);
  console.log('✅ Synchronized config.yaml to src/lib/data.ts');
} catch (e) {
  console.error('❌ Failed to sync config.yaml:', e);
}
