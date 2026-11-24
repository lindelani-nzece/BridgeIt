import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_FILES = [
  'index.html',
  'styles.css',
  'logic.js',
  'storage.js',
  'ui.js',
  'manifest.json',
  'sw.js',
  'icon.svg'
];

const FORBIDDEN_LOGIC_TOKENS = [
  'document.',
  'window.',
  'localStorage',
  'sessionStorage',
  'indexedDB',
  'fetch(',
  'alert(',
  'innerHTML'
];

const targetDir = path.resolve(process.argv[2] ?? '.');
const errors = [];

for (const file of REQUIRED_FILES) {
  const fullPath = path.join(targetDir, file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required BridgeIt file: ${file}`);
  }
}

const logicPath = path.join(targetDir, 'logic.js');
if (fs.existsSync(logicPath)) {
  const logicSource = fs.readFileSync(logicPath, 'utf8');
  for (const token of FORBIDDEN_LOGIC_TOKENS) {
    if (logicSource.includes(token)) {
      errors.push(`logic.js contains forbidden browser/side-effect token: "${token}"`);
    }
  }
}

const manifestPath = path.join(targetDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.display !== 'standalone') {
      errors.push('manifest.json "display" should be "standalone"');
    }
    if (!manifest.start_url) {
      errors.push('manifest.json is missing "start_url"');
    }
  } catch {
    errors.push('manifest.json is not valid JSON');
  }
}

if (errors.length > 0) {
  console.error('❌ BridgeIt validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
} else {
  console.log(`✅ BridgeIt bundle valid (${REQUIRED_FILES.length}/8 files checked).`);
}