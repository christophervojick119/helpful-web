# Confy::Config.env(ENV['CONFY_URL']) if ENV['CONFY_URL']

module Helpful
  extend self

  def incoming_email_domain
    ENV['INCOMING_EMAIL_DOMAIN'] || 'helpful.io'
  end

  def outgoing_email_domain
    ENV['OUTGOING_EMAIL_DOMAIN'] || 'helpful.io'
  end
end
