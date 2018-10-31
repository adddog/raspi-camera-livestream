var spawn = require('child_process').spawn
var exec = require('child_process').exec

function ffmpeg() {
  function start() {
    // console.log('here')
    // command = exec(`ffplay udp://192.168.1.81:7777`)
    command = exec(`raspivid -o - -t 0 -vf -hf -fps 30 -b 6000000 | ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -f h264 -i - -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv rtmp://a.rtmp.youtube.com/live2/${key}`)
  }

  function stop() {
    console.log('stop')
    command.kill()
  }
  return { start, stop }
}

module.exports = ffmpeg
