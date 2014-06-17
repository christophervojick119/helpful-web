/** @jsx React.DOM */

var InboxZero = React.createClass({
  render: function() {
    return (
      <div>
        <div className="conversation conversation-row conversation-row-empty">
          <div className="summary text-center">
            <img src="/assets/logo.png" />
            <h1>Inbox Zero</h1>
            <p className="lead">Congrats! Youre being a helpful human.</p>
          </div>
        </div>

        <div className="conversation conversation-row conversation-row-empty">
          <div className="summary text-center">
            <h3>Other ways to be helpful</h3>

            <p>Tell someone on your team one thing you appreciate about them.</p>

            <p>Look up your most active customers, and hand-write them a thank you letter.</p>

            <p>Tweet your customers and let them know you appreciate them choosing you to serve them.</p>
          </div>
        </div>
      </div>
    );
  }
});
