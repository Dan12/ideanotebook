Rails.application.routes.draw do
  root "idea#home"
  
  get "/idea/:id" => "idea#idea"
  
  get "/newidea" => "idea#newidea"
  post "/createidea" => "idea#createidea", :via => :post
  
  get "/edit/:id" => "idea#editidea"
  post "/editidea" => "idea#saveedits", :via => :post
  
  get "delete/:id" => "idea#delete"
end
