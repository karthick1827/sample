
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
            let body = '';
            for await (const chunk of req) {
              body += chunk;
            }
            try {
              req.body = JSON.parse(body || '{}');
            } catch (e) {
              req.body = {};
            }
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
