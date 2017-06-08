class Api::AppKeysController < ApplicationController
  def show
    @app_key = AppKey.where(app: params[:id])
  end
end
