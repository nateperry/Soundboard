// SoundRow.jsx

var React = require('react');
var Sound = require('./Sound.jsx');

module.exports = React.createClass({
  render: function () {
    return (
    <div className="row">
      {this.props.row.map(function(sound) {
        return <Sound key={sound.id} sound={sound} />
      })}
    </div>
    )
  }
});