import http from 'http';
import crypto from 'crypto';

async function checkModels(port, label) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(`http://192.168.1.168:${port}/v1/models`, { timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            ok: res.statusCode === 200,
            status: res.statusCode,
            latencyMs: Date.now() - start,
            models: parsed.data ? parsed.data.map(m => m.id) : parsed
          });
        } catch (e) {
          resolve({ ok: false, status: res.statusCode, error: e.message, raw: data.slice(0, 200) });
        }
      });
    });
    req.on('error', (err) => resolve({ ok: false, error: err.message, latencyMs: Date.now() - start }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'TIMEOUT' }); });
  });
}

async function testHttpChat(port, model, prompt) {
  return new Promise((resolve) => {
    const start = Date.now();
    const postData = JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
      temperature: 0.7
    });

    const req = http.request({
      hostname: '192.168.1.168',
      port,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            ok: res.statusCode === 200,
            status: res.statusCode,
            latencyMs: Date.now() - start,
            reply: parsed.choices?.[0]?.message?.content || parsed
          });
        } catch (e) {
          resolve({ ok: false, status: res.statusCode, error: e.message, raw: data.slice(0, 300) });
        }
      });
    });
    req.on('error', (err) => resolve({ ok: false, error: err.message, latencyMs: Date.now() - start }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'TIMEOUT' }); });
    req.write(postData);
    req.end();
  });
}

function testWebSocket(path) {
  return new Promise((resolve) => {
    const key = crypto.randomBytes(16).toString('base64');
    const req = http.request({
      hostname: '192.168.1.168',
      port: 8000,
      path,
      method: 'GET',
      headers: {
        'Connection': 'Upgrade',
        'Upgrade': 'websocket',
        'Sec-WebSocket-Key': key,
        'Sec-WebSocket-Version': '13'
      },
      timeout: 5000
    });

    req.on('upgrade', (res, socket) => {
      let receivedData = null;
      socket.on('data', (buf) => {
        receivedData = buf.toString('utf8');
      });

      // Send a session.update frame (RFC 6455 client masked frame)
      const payload = JSON.stringify({ type: 'session.update', session: { model: 'mistralai/Voxtral-Mini-4B-Realtime-Arabic' } });
      const payloadBuf = Buffer.from(payload);
      const frameLen = payloadBuf.length;
      const mask = crypto.randomBytes(4);

      let header;
      if (frameLen < 126) {
        header = Buffer.alloc(2 + 4);
        header[0] = 0x81; // FIN + text
        header[1] = 0x80 | frameLen;
        mask.copy(header, 2);
      } else {
        header = Buffer.alloc(4 + 4);
        header[0] = 0x81;
        header[1] = 0x80 | 126;
        header.writeUInt16BE(frameLen, 2);
        mask.copy(header, 4);
      }

      const maskedPayload = Buffer.alloc(frameLen);
      for (let i = 0; i < frameLen; i++) {
        maskedPayload[i] = payloadBuf[i] ^ mask[i % 4];
      }

      socket.write(Buffer.concat([header, maskedPayload]));

      setTimeout(() => {
        socket.destroy();
        resolve({
          ok: true,
          status: 101,
          headers: res.headers,
          serverReceivedFrame: true,
          receivedData: receivedData ? receivedData.slice(0, 300) : null
        });
      }, 1500);
    });

    req.on('response', (res) => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => resolve({ ok: false, status: res.statusCode, body: b }));
    });

    req.on('error', (err) => resolve({ ok: false, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'TIMEOUT' }); });
    req.end();
  });
}

(async () => {
  console.log('================================================================');
  console.log('   AUDIT DU RÉSEAU ET DES MODÈLES DISTANTS (192.168.1.168)      ');
  console.log('================================================================\n');

  console.log('1. TEST VOXTRAL (Port 8000) :');
  const voxModels = await checkModels(8000, 'Voxtral');
  console.log('   - Modèles disponibles :', JSON.stringify(voxModels));

  const voxChat = await testHttpChat(8000, 'mistralai/Voxtral-Mini-4B-Realtime-Arabic', 'مرحبا، عرفني بنفسك في جملة واحدة.');
  console.log('   - Requête Chat HTTP :', JSON.stringify(voxChat));

  console.log('\n2. TEST WEBSOCKET VOXTRAL REALTIME (ws://192.168.1.168:8000/v1/realtime) :');
  const wsRes = await testWebSocket('/v1/realtime');
  console.log('   - WebSocket Handshake & Frames :', JSON.stringify(wsRes));

  console.log('\n3. TEST MOULSOT (Port 7200) :');
  const moulModels = await checkModels(7200, 'Moulsot');
  console.log('   - Modèles disponibles :', JSON.stringify(moulModels));

  const moulChat = await testHttpChat(7200, 'atlasia/moulsot.v0.3', 'Bonjour, présentez-vous.');
  console.log('   - Requête Chat HTTP :', JSON.stringify(moulChat));

  console.log('\n================================================================');
})();
