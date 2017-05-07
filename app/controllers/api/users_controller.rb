class Api::UsersController < ApplicationController
  def create; end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render json: @user, status: 200
    else
      render json: ["not found"], status: 404
    end
  end

  def update; end
end
