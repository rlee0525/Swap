require 'rails_helper'

RSpec.describe Api::CoursesController, type: :controller do
  describe "GET #show when VALID" do
    render_views
    let! (:course) { create(:course) }

    before(:each) do
      get :show, params: { id: course.id }
    end

    it { should respond_with(200) }
    it { should render_template(:show) }
  end

  describe "GET #show when INVALID" do
    render_views

    before(:each) do
      get :show, params: { id: 0 }
    end

    it { should respond_with(404) }
    it { should_not render_template(:show) }
  end

  describe "GET #index when VALID" do
    render_views
    let! (:course) { create(:course) }

    before(:each) do
      get :index
    end

    it { should respond_with(200) }
    it { should render_template(:index) }
  end
end
