/** @jsx React.DOM */

var Conversation = React.createClass({
  renderStatus: function() {
    var isUnread = this.isUnread();
    var isStale = this.isStale();

    if(isUnread || isStale) {
      var classes = React.addons.classSet({
        'status': true,
        'status-info': !isStale && isUnread,
        'status-warning': isStale
      });

      return (
        <div className={classes}></div>
      );
    }
  },

  renderActions: function() {
    var button = null;

    if(this.props.conversation.archived) {
      button = <button className="btn btn-link btn-xs" onClick={this.props.unarchiveHandler}>Move to Inbox</button>
    } else {
      button = <button className="btn btn-link btn-xs" onClick={this.props.archiveHandler}>Archive</button>
    }

    return <div className="conversation-actions pull-right">{button}</div>
  },

  renderHeader: function() {
    var title = null;
    var previewBody = null;

    if(this.props.conversation.subject) {
      title = this.props.conversation.subject;
    } else {
      title = this.props.conversation.summary;
    }

    if(this.props.conversation.subject && !this.props.conversation.expanded) {
      previewBody = <span className="text-muted" dangerouslySetInnerHTML={{__html: this.preview()}} />;
    }

    var classes = React.addons.classSet({
      'ellipsis-overflow': !this.props.conversation.expanded,
    });

    return (
      <a href="#" onClick={this.props.toggleHandler}>
        <div className="conversation-header">
          {this.renderStatus()}
          {this.renderActions()}

          <Avatar person={this.props.conversation.creator_person} size="20" />
          <Person person={this.props.conversation.creator_person} />

          <div className="conversation-preview">
            <div className={classes}>
              <strong>{title}</strong>
              &nbsp;
              {previewBody}
            </div>
          </div>
        </div>
      </a>
    );
  },

  renderBody: function() {
    if(this.props.conversation.expanded) {
      return (
        <div className="conversation-body">
          <div className="conversation-stream">
            <Stream items={this.streamItems()} />
          </div>

          <div className="conversation-response">
            <Response conversation={this.props.conversation} addStreamItemHandler={this.props.addStreamItemHandler} archiveHandler={this.props.archiveHandler} demo={this.props.demo} />
          </div>
        </div>
      );
    }
  },

  render: function() {
    var classes = React.addons.classSet({
      'conversation': true,
      'is-expanded': this.props.conversation.expanded,
      'is-collapsed': !this.props.conversation.expanded
    });

    return (
      <div className={classes}>
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  },

  streamItems: function() {
    var items = _.flatten([
      this.props.conversation.messages,
      this.props.conversation.assignment_events,
      this.props.conversation.tag_events
    ])

    return _.sortBy(items, function(item) { return item.created });
  },

  // TODO: Implement read receipts
  isUnread: function() {
    return this.props.conversation.unread;
  },

  isStale: function() {
    return !this.props.conversation.archived &&
      moment(this.props.conversation.last_activity_at) < moment().subtract('days', 3)
  },

  hasReply: function() {
    return this.props.conversation.messages.length > 1;
  },

  preview: function() {
    var converter = new Showdown.converter();
    return $(converter.makeHtml(this.props.conversation.messages[0].content)).text();
  }
});
