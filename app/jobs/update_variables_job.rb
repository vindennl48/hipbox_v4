class UpdateVariablesJob < ApplicationJob
  queue_as :default

  # This updates variables for everyone every
  #  10 seconds.  Just in case things dont quite
  #  sync up during regular operation (which happens
  #  way more often than I would like..)
  def perform
    Thread.new do
      loop do
        ActionCable.server.broadcast "variables_channel",
          {user_id: 0, note: Note.all}
        sleep(5)
      end
    end
  end

end
