class Api::RfpsController < ApplicationController
  def index
    # TODO make it user specific
    @rfps = Rfp.all
    render "api/rfps/index", status: 200
  end

  def create
    # TODO make it user specific
    @rfp = Rfp.new(
      # user: User.find_by(id: params[:user_id]),
      user: User.first,
      description: params[:description]
    )
    if @rfp.save
      render "api/rfps/show", status: 200
    else

      render json: @rfp.errors.full_messages, status: 422
    end
  end

  def destroy
    @rfp = Rfp.find_by(id: params[:id])
    if @rfp && @rfp.destroy
      render "api/rfps/show", status: 200
    else
      render json: ["not found"], status: 404
    end
  end
end
