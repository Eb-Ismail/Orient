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
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  buffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  
  return buffer;
}

const wavBuffer = createWav();
const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

const parts = [
  Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test.wav"\r\nContent-Type: audio/wav\r\n\r\n`),
  wavBuffer,
  Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\natlasia/moulsot.v0.3\r\n`),
  Buffer.from(`--${boundary}--\r\n`)
];

const body = Buffer.concat(parts);

const req = http.request({
  hostname: '192.168.1.168',
  port: 7200,
  path: '/v1/audio/transcriptions',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length
  },
  timeout: 15000
}, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Moulsot STT status:', res.statusCode);
    console.log('Response body:', d);
  });
});

req.on('error', e => console.error('Req error:', e));
req.write(body);
req.end();

