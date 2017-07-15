#  id                      :integer          not null, primary key
#  fb_id                   :integer          not null
#  edu_email               :string
#  university_id           :integer
#  marketing_opt_in        :boolean          default("true"), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  fb_email                :string
#  edu_email_confirmed     :boolean          default("false")
#  edu_email_confirm_token :string

class Api::UsersController < ApplicationController
  def create
    p params
    fb_id = fb_id(params[:accessToken])
    p fb_id
    @user = fb_auth_user(params[:accessToken])
    p @user
    if @user
      p "hi"
      return render "api/users/show", status: 200
    else
      @user = User.new(fb_id: fb_id)
      p @user
      if @user.save
        p "hi2"
        @user.mail
        return render "api/users/show", status: 200
      else
        p @user.errors.full_messages
        return render json: ["invalid token"], status: 401
      end
    end
  end

  def update
    @user = fb_auth_user(params[:id])
    edu_email = params[:edu_email]

    if @user && @user.edu_email_confirmed
      render "api/users/show", status: 200
    elsif @user && @user.update(edu_email: edu_email)
      @user.mail
      render "api/users/show", status: 200
    else
      render json: ["invalid fb_id / edu_email"], status: 500
    end
  end

  def show
    @user = fb_auth_user(params[:id])

    if @user
      render "api/users/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
