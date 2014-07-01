class ConversationMailbox
  attr_accessor :account, :user, :params

  def self.find(account, user, params)
    new(account, user, params).find
  end

  def initialize(account, user, params)
    self.account = account
    self.user = user
    self.params = params
  end

  def find
    if search?
      search
    elsif archive?
      archive
    elsif inbox?
      inbox
    else
      account_conversations
    end
  end

  def inbox
    account_conversations.unresolved.order('updated_at DESC')
  end

  def inbox?
    params[:archived] == 'false'
  end

  def archive
    account_conversations.archived.order('created_at DESC')
  end

  def archive?
    params[:archived] == 'true'
  end

  def account_conversations
    account.conversations.with_messages.
      includes(messages: [:person, :attachments]).
      includes(first_message: :person).
      includes(:most_recent_message).
      includes(assignment_events: [{ user: :person }, { assignee: :person }]).
      includes(tag_events: { user: :person }).
      with_message_count
  end

  def search
    ConversationSearch.new(account, user, { q: query }).matching_conversations
  end

  def search?
    query.present?
  end

  def query
    params[:query].to_s.strip
  end
end
