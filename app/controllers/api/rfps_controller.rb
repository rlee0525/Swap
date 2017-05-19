class Api::RfpsController < ApplicationController
  def index
    user = fb_auth_user(params[:access_token])
    @rfps = user.rfps
    render "api/rfps/index", status: 200
  end

  def create
    user = fb_auth_user(params[:access_token])
    @rfp = Rfp.new(
      user: user,
      description: params[:description]
    )
    if @rfp.save
      render "api/rfps/show", status: 200
    else
      render json: @rfp.errors.full_messages, status: 422
    end
  end

  def destroy
    user = fb_auth_user(params[:access_token])
    @rfp = Rfp.find_by(id: params[:id])
    if @rfp && @rfp.user == user && @rfp.destroy
      render "api/rfps/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
