// soundboard.jsx

var React = require('react');
var SoundRow = require('./SoundRow.jsx');
var Sound = require('./Sound.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      sounds: [
        {
          id: 1,
          path: '/sounds/chimes.mp3',
          audioId: 'someName1',
          name: 'chimes',
          filetype: 'mp3',
          fullName: 'chimes.mp3',
          volume: 1
        },
        {
          id: 2,
          path: '/sounds/yeah.mp3',
          audioId: 'someName2',
          name: 'yeah',
          filetype: 'mp3',
          fullName: 'yeah.mp3',
          volume: 1
        },
        {
          id: 3,
          path: '/sounds/piano.mp3',
          audioId: 'someName3',
          name: 'piano',
          filetype: 'mp3',
          fullName: 'piano.mp3',
          volume: 1
        },
        {
          id: 4,
          path: '/sounds/piano.mp3',
          audioId: 'someName4',
          name: 'piano',
          filetype: 'mp3',
          fullName: 'piano.mp3',
          volume: 1
        },
        {
          id: 5,
          path: '/sounds/yeah.mp3',
          audioId: 'someName5',
          name: 'yeah',
          filetype: 'mp3',
          fullName: 'yeah.mp3',
          volume: 1
        },
        {
          id: 6,
          path: '/sounds/yeah.mp3',
          audioId: 'someName6',
          name: 'yeah',
          filetype: 'mp3',
          fullName: 'yeah.mp3',
          volume: 1
        },
        {
          id: 7,
          path: '/sounds/yeah.mp3',
          audioId: 'someName7',
          name: 'yeah',
          filetype: 'mp3',
          fullName: 'yeah.mp3',
          volume: 1
        }
      ]
    };
  },
  componentDidMount: function () {
    var self = this;
    $(window).on('keypress', function (e) {
      // TODO: hook up key bindings, consider using keyhandler class
      console.log('pressed:' + e.which + ' = ' + self.keyMap[e.which]);
    });
  },
  render: function() {
    var sounds = this.state.sounds;
    var rows = [], row = [];
    for (var i=0;i<sounds.length;i++) {
      row.push(sounds[i]);
      if ((i + 1)%3 === 0 || i === sounds.length-1) {
        rows.push(row);
        row = []; // reset the row
      }
    }
    return (
      <div id="soundboard">
        {rows.map(function (row, index) {
            return <SoundRow key={index} row={row} />;
        })}
      </div>
    );
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
});