class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def record_not_found
    # handle redirect
    puts 'redirecting to dest'
  end
end
