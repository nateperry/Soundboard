// main.js
$(document).foundation();
$(document).ready(function () {
  Soundboard.init();
});

var Soundboard = {
  $container: $('#sounds-cta'),
  columns: 3,
  validExtensions: ['mp3', 'wav'],
  sounds: ['chimes.mp3', 'piano.mp3', 'yeah.mp3', 'yeah.mp3', 'chimes.mp3', 'piano.mp3'],
  soundObjects: {},
  init: function () {
    console.log('Soundboard initialized');
    this.redraw();
  },
  redraw: function () {
    this.draw();
    this.addEventListeners();
  },
  draw: function () {
    this.$container.html('');
    for (var i=0;i<this.sounds.length;i++) {
      var sound = new Sound(this.sounds[i], i);
      // add the sound to object hash
      this.soundObjects[sound.audioId] = sound;
      if (this.validateExtension(sound.filetype)) {
        if (i % this.columns === 0) {
          this.$container.append(this.addRow());
        }
        this.$container.find('.row').last().append(sound.html());
        sound.audio = document.getElementById(sound.audioId);
      } else {
        alert('Invalid file: '+sound.fullName);
      }
    };
  },
  addRow: function () {
    return '<div class="row sound-row"></div>';
  },
  validateExtension: function (ext) {
    for (var i=0;i<this.validExtensions.length;i++) {
      if (ext === this.validExtensions[i]) {
        return true;
      }
      return false;
    }
  },
  addEventListeners: function () {
    var self = this;
    $(window).on('keypress', function (e) {
      console.log('pressed:' + e.which + ' = ' + self.keyMap[e.which]);
    });
    $('.play').on('click', function () {
      var $this = $(this);
      if ($this.hasClass('paused')) {
        $this.removeClass('fa-pause').addClass('fa-play').removeClass('paused').addClass('playing');
        self.pauseAudio(this.getAttribute('data-audio-id'));
      } else {
        $this.removeClass('fa-play').addClass('fa-pause').removeClass('playing').addClass('paused');
        self.playAudio(this.getAttribute('data-audio-id'));
      }
    });
    $('.stop').on('click', function () {
      $(this).toggleClass('stopped');
      self.stopAudio(this.getAttribute('data-audio-id'));
    });
    $('.repeat').on('click', function () {
      $(this).toggleClass('repeating');
      self.repeatAudio(this.getAttribute('data-audio-id'));
    });
    $('.delete').on('click', function () {
      self.onDeleteAudio(confirm('Are you sure you want to delete this audio file?'), this.getAttribute('data-audio-id'));
    });
    $('audio').on('ended', function () {
      var $controls = $(this).next('.controls');
      $controls.find('.fa').first().removeClass('playing').removeClass('paused').removeClass('fa-pause').addClass('fa-play');
      self.onAudioEnded(this);
    });
  },
  playAudio: function (audioId) {
    this.soundObjects[audioId].play();
  },
  pauseAudio: function (audioId) {
    this.soundObjects[audioId].pause();
  },
  stopAudio: function (audioId) {
    this.soundObjects[audioId].stop();
  },
  repeatAudio: function (audioId) {
    if (this.soundObjects[audioId].audio.getAttribute('loop') === null) {
      this.soundObjects[audioId].audio.setAttribute('loop', true);
      console.log(this.soundObjects[audioId].audio);
    } else {
      this.soundObjects[audioId].audio.removeAttribute('loop');
    }
  },
  onAudioEnded: function (audio) {
    console.log(audio + ' ended');
  },
  onDeleteAudio: function (shouldDelete, audioId) {
    console.log(audioId);
    if (shouldDelete === true) {
      var sound = this.soundObjects[audioId];
      delete this.sounds.splice(sound.index, 1);
      delete this.soundObjects[audioId];
      console.log(this.sounds, this.soundObjects);
      this.redraw();
    }
  },
  keyMap: {
    '13': 'enter',
    '32': 'pauseAll',
    // 0 - 9
    '48':'',
    '49':'',
    '50':'',
    '51':'',
    '52':'',
    '53':'',
    '54':'',
    '55':'',
    '56':'',
    '57':'',
    // a-z
    '97':'',
    '98':'',
    '99':'',
    '100':'',
    '101':'',
    '102':'',
    '103':'',
    '104':'',
    '105':'',
    '106':'',
    '107':'',
    '108':'',
    '109':'',
    '110':'',
    '111':'',
    '112':'',
    '113':'',
    '114':'',
    '115':'',
    '116':'',
    '117':'',
    '118':'',
    '119':'',
    '120':'',
    '121':'',
    '122':''
  }
};
/*
* @class Sound
* @desc the core sound object, handles all needed functions
*/
function Sound (path, index) {
  this.index = index;
  this.path = '/sounds/'+path;
  var split = path.split('.');
  this.name = split[0];
  this.filetype = split[1];
  this.fullName = this.name +'.'+ this.filetype;
  this.audioId = this.getAudioId();
  this.audio = document.getElementById(this.audioId);
  this.volume = 1;
}
Sound.prototype.html = function() {
  var html = '';
  html += '<div class="small-12 medium-6 large-4 columns">';
  html += '<div class="sound">';
  html += this.getOptionsHTML();
  html += '<h3 class="sound-name">'+this.name+'</h3>';
  html += '<audio id="'+this.audioId+'" src="'+this.path+'" preload="auto"></audio>';
  html += this.getControlsHTML();
  html += '</div>'; // .sound
  html += '</div>';
  return html;
};
Sound.prototype.getAudioId = function () {
  return 'audio-'+(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5));
}
Sound.prototype.getOptionsHTML = function () {
  var html = '';
  html += '<div class="options">';
  html += '<i class="fa fa-close delete" data-audio-id="'+this.audioId+'"></i>';
  html += '</div>';
  return html;
}
Sound.prototype.getControlsHTML = function () {
  html = '<div class="controls">';
  html += '<i class="fa fa-play play" data-audio-id="'+this.audioId+'"></i>';
  html += '<i class="fa fa-stop stop" data-audio-id="'+this.audioId+'"></i>';
  html += '<i class="fa fa-repeat repeat" data-audio-id="'+this.audioId+'"></i>';
  html += '</div>';
  return html;
}
Sound.prototype.play = function () {
  this.audio.play();
}
Sound.prototype.pause = function () {
  this.audio.pause();
}
Sound.prototype.stop = function () {
  this.audio.pause();
  this.audio.currentTime = 0;
}
Sound.prototype.repeat = function () {
  if (this.audio.getAttribute('loop') === null) {
    this.audio.setAttribute('loop'. true);
  } else {
    this.audio.removeAttribute('loop');
  }
}