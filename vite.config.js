
import fs from 'node:fs';
import path from 'node:path';

// Helper to load .env into process.env during Vite dev
function loadLocalEnv() {
  try {
    const envFile = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envFile)) {
      const lines = fs.readFileSync(envFile, 'utf8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [k, ...v] = trimmed.split('=');
          const val = v.join('=').trim().replace(/^["']|["']$/g, '');
          if (!process.env[k.trim()]) {
            process.env[k.trim()] = val;
          }
        }
      }
    }
  } catch (e) {}
}

loadLocalEnv();

// ACL-ADLC Markdown Studio & API Middleware
function aclApiPlugin() {
  return {
    name: 'acl-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const parsedUrl = (req.url || '').split('?')[0];
        if (!parsedUrl.startsWith('/api/')) return next();

        const endpoint = parsedUrl.replace('/api/', '');
        const routeMap = {
          'list-markdown-files': './api/list-markdown-files.js',
          'generate-step': './api/generate-step.js',
          'save-markdown': './api/save-markdown.js',
          'implementation-progress': './api/implementation-progress.js'
        };

        const targetFile = routeMap[endpoint];
        if (!targetFile) return next();

        try {
          if (req.method === 'POST' && !req.body) {
            req.body = await new Promise((resolve) => {
              let data = '';
              req.on('data', chunk => { data += chunk; });
              req.on('end', () => {
                try { resolve(JSON.parse(data || '{}')); } catch(e) { resolve({}); }
              });
              req.on('error', () => resolve({}));
            });
          }

          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };

          const mod = await import(targetFile);
          await mod.default(req, res);
        } catch (err) {
          console.error(`[API Middleware Error: ${endpoint}]`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}

import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    aclApiPlugin(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
