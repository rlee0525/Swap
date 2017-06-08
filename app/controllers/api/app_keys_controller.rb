class Api::AppKeysController < ApplicationController
  def show
    @app_key = AppKey.find_by(app: params[:id])
  end
end
