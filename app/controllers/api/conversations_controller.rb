class Api::ConversationsController < ApplicationController
  def index
    user = fb_auth_user(params[:access_token])
    @conversations = user.conversations
  end

  def create
    @conversation = Conversation.new(conversation_params)
    if @conversation.save
      render json: ['success']
    else 
      render json: @conversation.errors.full_messages, status: 422
    end
  end

  def destroy
    @conversation = Conversation.find_by(id: params[:id], user_id: params[:user_id])
    @conversation.archived = true
    @converstion.save
    render json: ['success']
  end

  private

  def conversation_params 
    params.require(:conversation).permit(:conversation_id, :user_id, :achived)
  end
end
