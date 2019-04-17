require("dotenv").config();

console.log("ENV VAR:", process.env.GOOGLE_APPLICATION_CREDENTIALS)

// ********************TESTING SPEECH ENGINE******************* //

const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('recognizeStream error', console.error)
  .on('data', data =>
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    )
  );

// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');


//**************************** With Wit.AI ************************************/

// var rec = require('node-record-lpcm16')
// var request = require('request')
 
// // var witToken = process.env.WIT_TOKEN; // get one from wit.ai!
// var witToken = "REKMR5WLT5WL25LAEEQ5ESP6UES5F32Z"
// exports.parseResult = function (err, resp, body) {
//   console.log(body)
// }
 
// rec.start().pipe(request.post({
//   'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
//   'headers' : {
//     'Accept'        : 'application/vnd.wit.20160202+json',
//     'Authorization' : 'Bearer ' + witToken,
//     'Content-Type'  : 'audio/wav'
//   }
// }, exports.parseResult))


// //*********** */
// var record = require('node-record-lpcm16')
// var fs = require('fs')
 
// var file = fs.createWriteStream('test.wav', { encoding: 'binary' })
 
// record.start({
//   sampleRate : 44100,
//   verbose : true
// })
// .pipe(file)
