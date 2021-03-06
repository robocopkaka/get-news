require 'json'
class SourcesController < ApplicationController
  def index
    @sources = Source.all
    respond_to do |format|
      format.html
      format.json{render json: @sources}
    end
  end

  def new
    @source = Source.new
  end

  def create
    @source = Source.new(source_params)
  end

  def edit
  end

  def update
  end

  def confirm_sources
    @sources = JSON.parse(params[:sources])
    @sources.each{|source| current_user.sources << source}
    # logger.info("#{@sources}")
    # current_user.sources << @sources
    current_user.save
    # logger.info("#{JSON.parse(params[:sources])}")
    respond_to do |format|
      format.json{render json: @sources}
    end
  end

  private
  def source_params
    params.require(:source).permit(:name, :logo, :shortcode)
  end
end
