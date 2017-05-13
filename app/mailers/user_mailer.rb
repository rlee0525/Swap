class UserMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  def registration_confirmation(user)
    @user = user
    mail(to: @user.edu_email, subject: "Registration Confirmation")
  end

  def rfp_alert(user, content)
    @user = user
    @content = content
    mail(to: @user.edu_email, subject: "RFP Alert")
  end
end
