#  id                      :integer          not null, primary key
#  fb_id                   :integer          not null
#  edu_email               :string
#  university_id           :integer          not null
#  marketing_opt_in        :boolean          default("true"), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  fb_email                :string
#  edu_email_confirmed     :boolean          default("false")
#  edu_email_confirm_token :string

class Api::UsersController < ApplicationController
  def create
    # TODO
    @user = User.new(
      fb_id: 123,
      edu_email: "something@edu.edu",
      university_id: 123,
      fb_email: "something"
    )
    if @user.save
      UserMailer.registration_confirmation(@user).deliver
      # TODO
    else
      # TODO something else
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render "api/users/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  def update; end
end
