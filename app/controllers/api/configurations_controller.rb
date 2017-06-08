class Api::ConfigurationsController < ApplicationController
  def show
    @configuration = Configuration.find_by(app: params[:app])
  end
end
