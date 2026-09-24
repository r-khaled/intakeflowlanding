import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

export const handler = async (event) => {
  const rawPath = event.rawPath || event.path || '/';

  // ==========================================
  // 1. خدمة ملفات الكلاينت (Static Assets)
  // ==========================================
  const filePath = path.join(__dirname, 'dist', 'client', rawPath === '/' ? 'index.html' : rawPath);
  const ext = path.extname(filePath);

  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
    const isBinary = ['.png', '.jpg', '.jpeg', '.ico'].includes(ext);
    const content = fs.readFileSync(filePath, isBinary ? null : 'utf-8');

    return {
      statusCode: 200,
      headers: { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' },
      body: isBinary ? content.toString('base64') : content,
      isBase64Encoded: isBinary
    };
  }

  // ==========================================
  // 2. تشغيل الـ SSR (نظام Web Fetch API)
  // ==========================================
  try {
    const ssrModule = await import('./dist/server/server.js');
    
    // استخراج دالة الـ fetch من الأوبجكت
    const fetchHandler = ssrModule.default?.fetch;

    if (typeof fetchHandler === 'function') {
      // 1. تأمين قراءة الهيدرز والمسار وتجنب TypeError بتاع الـ host
      const headers = event.headers || {};
      const host = headers.host || 'localhost';
      const queryString = event.rawQueryString ? '?' + event.rawQueryString : '';
      const url = `https://${host}${rawPath}${queryString}`;
      
      const method = event.requestContext?.http?.method || event.httpMethod || 'GET';
      
      const init = {
        method: method,
        headers: headers
      };
      
      if (init.method !== 'GET' && init.method !== 'HEAD' && event.body) {
        init.body = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
      }
      
      const request = new Request(url, init);
      
      // 2. تشغيل كود TanStack Start الأصلي
      const response = await fetchHandler(request);
      
      // 3. تجميع النتيجة وتحويلها لصيغة أمازون اللامدا
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      
      return {
        statusCode: response.status,
        headers: responseHeaders,
        body: await response.text()
      };
    } else {
      throw new Error('لم يتم العثور على fetch handler في dist/server/server.js');
    }

  } catch (e) {ش
    console.error('TanStack SSR Error:', e);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'Internal Server Error - Check CloudWatch'
    };
  }
};