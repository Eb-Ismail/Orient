import http from 'http';

function createWav() {
  const sampleRate = 16000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const dataSize = sampleRate * 1 * (bitsPerSample / 8);
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  buffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  return buffer;
}

async function testStt(port, model) {
  return new Promise((resolve) => {
    const wav = createWav();
    const boundary = '----Boundary' + Math.random().toString(36).substring(2);
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.wav"\r\nContent-Type: audio/wav\r\n\r\n`),
      wav,
      Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\n${model}\r\n`),
      Buffer.from(`--${boundary}--\r\n`)
    ]);

    const req = http.request({
      hostname: '192.168.1.168',
      port,
      path: '/v1/audio/transcriptions',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      },
      timeout: 10000
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ port, status: res.statusCode, body: d }));
    });
    req.on('error', e => resolve({ port, error: e.message }));
    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('Moulsot STT (port 7200):', await testStt(7200, 'atlasia/moulsot.v0.3'));
  console.log('Voxtral STT (port 8000):', await testStt(8000, 'mistralai/Voxtral-Mini-4B-Realtime-Arabic'));
})();

