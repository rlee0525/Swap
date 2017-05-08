class UserMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
  
  def registration_confirmation(user)
    @user = user
    mail(to: user.edu_email, subject: "Registration Confirmation")
  end
end
