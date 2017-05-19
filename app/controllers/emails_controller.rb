class EmailsController < ApplicationController
  def confirm_email
    user = User.find_by_edu_email_confirm_token(params[:token])
    debugger
    if user
      user.email_activate
      redirect_to root_url
    else
      redirect_to root_url
    end
  end
end
