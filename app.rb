before do
    @user = User.find(session[:user_id]) if session[:user_id]
end

get '/' do
    redirect '/search' if session[:user_id]
    erb :index
end

get '/search' do
    redirect '/' if session[:user_id] == nil
    @user = User.find(session[:user_id])
    erb :search
end

post '/create_user' do
    # user = User.create(params[:user])
    user = User.new(params[:user])
    if user.save
        session[:user_id] = user.id
        redirect '/search'
    else
        flash[:error] = user.errors.full_messages
        redirect '/'
    end
end

post '/sign_in' do
    user = User.where(username: params[:username])[0]
    redirect '/' if user == nil || user.password != params[:password]
    session[:user_id] = user.id
    flash[:notice] = "Successfully signed in."
    redirect '/search'
end

post '/sign_out' do
    session[:user_id] = nil
    flash[:notice] = "Successfully logged out."
    redirect '/'
end

post '/create_book' do
    Book.create(title: params[:title], user_id: @user.id)
end

get '/books' do
	books = Book.where(user_id: @user.id)
    books.to_json
end
