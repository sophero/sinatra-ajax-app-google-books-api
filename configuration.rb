require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/flash'
require 'json'

set :database, 'sqlite3:googlebooks.sqlite3'
set :sessions, true

require './app'
require './models'
