// import * as PlayHT from 'playht';
// import fs from 'fs';
// const player = require('play-sound')();


// // Initialize client
// PlayHT.init({
//   userId: import.meta.env.VITE_TTS_USER_ID,
//   apiKey: import.meta.env.VITE_TTS_API_KEY
// });

// export async function streamAudio(text: string) {
//     const stream = await PlayHT.stream(text, { voiceEngine: 'PlayDialog' });
//     const filePath = 'output.mp3';
//     const writeStream = fs.createWriteStream(filePath);

//     stream.pipe(writeStream);

//     return new Promise((resolve, reject) => {
//         writeStream.on('finish', () => {
//             // Play the audio file after it is fully written
//             player.play(filePath, (err: any) => {
//                 if (err) reject(err);
//                 else resolve(true);
//             });
//         });
//         writeStream.on('error', reject);
//         stream.on('error', reject);
//     });
// }