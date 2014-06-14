/** @jsx React.DOM */

var ConversationList = React.createClass({
  getInitialState: function() {
    return {
      conversations: [],
      currentUser: {
        person: {
          initials: '',
          gravatar_url: ''
        }
      }
    };
  },

  componentDidMount: function() {
    this.getConversations();
  },

  getConversations: function() {
    $.getJSON(this.props.source, function(response) {
      var conversations = response.conversations;

      conversations = conversations.map(function(conversation) {
        conversation.messagesVisible = false;
        return conversation;
      });

      this.setState({ conversations: conversations });
    }.bind(this));
  },

  // TODO: This is terrible; Use React.addons.update()
  toggleMessagesHandler: function(index) {
    this.state.conversations[index].messagesVisible = !this.state.conversations[index].messagesVisible;
    this.replaceState(this.state);
  },

  // TODO: This is terrible; Use React.addons.update()
  addMessageHandler: function(index, message) {
    this.state.conversations[index].stream_items.push(message);
    this.replaceState(this.state);
  },

  render: function() {
    return (
      <div className="list list-conversations">
        {this.state.conversations.map(function(conversation, index) {
          var toggleMessages = function() {
            this.toggleMessagesHandler(index);
          }.bind(this);

          var addMessage = function(message) {
            this.addMessageHandler(index, message);
          }.bind(this);

          return (
            <Conversation
              conversation={conversation}
              currentUser={this.state.currentUser}
              messagesVisible={conversation.messagesVisible}
              toggleMessagesHandler={toggleMessages}
              addMessageHandler={addMessage}
              key={conversation.id} />
          );
        }.bind(this))}
      </div>
    );
  }
});
