class UserMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  def registration_confirmation(user)
    @user = user
    mail(to: @user.edu_email, subject: "Registration Confirmation")
  end

  def first_reminder(user)
    @user = user
    mail(to: @user.edu_email, subject: "Registration Confirmation")
  end

  def second_reminder(user)
    @user = user
    mail(to: @user.edu_email, subject: "Registration Confirmation")
  end

  def rfp_alert(user, post, description)
    @user = user
    @post = post
    @description = description
    mail(to: @user.edu_email, subject: "RFP Alert")
  end
end
