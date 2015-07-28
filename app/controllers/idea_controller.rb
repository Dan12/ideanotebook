class IdeaController < ApplicationController
  def home
    @ideas = Idea.all
    render "home"
  end
  
  def idea
    @idea = Idea.find_by_id(params["id"])
    if !(@idea == nil)
      render "idea"
    else
      render "noidea"
    end
  end
  
  def newidea
    render "new"
  end
  
  def createidea
    i = Idea.new
    i.idea = params["idea"]
    i.image = params["image"]
    i.save
    render :json => {"id" => i.id}
  end
  
  def editidea
    @idea = Idea.find_by_id(params["id"])
    if !(@idea == nil)
      render "edit"
    else
      render "noidea"
    end
  end
  
  def saveedits
    i = Idea.find_by_id(params["editId"])
    i.idea = params["idea"]
    i.image = params["image"]
    i.save
    render :json => {"id" => i.id}
  end
  
  def delete
    i = Idea.find_by_id(params["id"])
    i.destroy
    redirect_to "/"
  end
end