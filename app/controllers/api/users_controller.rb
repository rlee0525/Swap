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
    access_token = params[:accessToken]
    fb_id = fb_id(access_token)
    user = User.find_by(fb_id: fb_id)
    if user
      @user = user
      return render "api/users/show", status: 200
    else
      @user = User.new(fb_id: fb_id)
      if @user.save
        return render "api/users/show", status: 200
      else
        return render json: ["invalid token"], status: 401
      end
    end
  end

  def update
    # debugger
    edu_email = params[:edu_email]
    access_token = params[:id]
    fb_id = fb_id(access_token)

    if fb_id && edu_email
      @user = User.find_by(fb_id: fb_id)
      if @user.edu_email_confirmed
        return render "api/users/show", status: 200
      elsif
        @user.update(edu_email: "#{edu_email}@berkeley.edu")
        return render "api/users/show", status: 200
      else
        return render json: ["couldn't update edu email"], status: 500
      end
    end
    render json: ["invalid fb_id / edu_email"], status: 500
  end

  def show
    access_token = params[:id]
    fb_id = fb_id(access_token)
    @user = User.find_by(fb_id: fb_id)
    if @user
      render "api/users/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
