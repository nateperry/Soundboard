// Sound.jsx

var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      playing: false,
      stopped: false,
      paused: false,
      loop: false,
      audio: null
    })
  },
  componentDidMount: function () {
    var $sound = $('#'+this.getId());
    this.setState({audio: $sound.find('audio')[0]});
    var _self = this;
    $sound.find('.play').on('click', function () {
      _self.playOrPauseAudio();
    });
    $sound.find('.stop').on('click', function () {
      _self.stopAudio();
    });
    $sound.find('.repeat').on('click', function () {
      _self.repeatAudio();
    });
    $sound.find('.delete').on('click', function () {
      _self.onDeleteAudio(confirm('Are you sure you want to delete this audio file?'), this.getAttribute('data-audio-id'));
    });
    $sound.find('audio').on('ended', function () {
      _self.onAudioEnded();
    });
  },
  getId: function () {
    return 'sound-'+this.props.sound.id;
  },
  render: function () {
    return (
    <div className="small-12 medium-6 large-4 columns">
      <div id={this.getId()} className="sound">
        <div className="options">
          <i className="fa fa-close delete" data-audio-id={this.props.sound.audioId}></i>
        </div>
        <h3 className="sound-name">{ this.props.sound.name }</h3>
        <audio id={this.props.sound.audioId} src={this.props.sound.path} preload="auto"></audio>
        <div className="controls">
            <i className={(!this.state.playing)?'fa fa-play play':'fa fa-pause play paused'} data-audio-id={this.props.sound.audioId}></i>
            <i className={(!this.state.stopped)?'fa fa-stop stop':'fa fa-stop stop stopped'} data-audio-id={this.props.sound.audioId}></i>
            <i className={(!this.state.loop)?'fa fa-repeat repeat':'fa fa-repeat repeat repeating'} data-audio-id={this.props.sound.audioId}></i>
        </div>
      </div>
    </div>
    )
  },
  playOrPauseAudio: function () {
    if (this.state.playing) {
      this.setState({
        playing: false,
        paused: true,
        stopped: false
      });
      this.state.audio.pause();
    } else {
      this.setState({
        playing: true,
        paused: false,
        stopped: false
      });
      this.state.audio.play();
    }
  },
  stopAudio: function () {
    this.setState({
      playing: false,
      paused: false,
      stopped: true
    });
    this.state.audio.stop();
  },
  repeatAudio: function () {
    var loop = !this.state.loop;
    this.setState({
        loop: loop
    });
    this.state.audio.setAttribute('loop', loop);
  },
  onDeleteAudio: function () {
    // TODO: figure this out
  },
  onAudioEnded: function () {
    console.log('endded');
    this.setState({
      playing: false,
      paused: false,
      stopped: false
    });
  }
});