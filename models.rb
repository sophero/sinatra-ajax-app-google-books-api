class User < ActiveRecord::Base
    has_many :books
    validates :username, uniqueness: true
end

class Book < ActiveRecord::Base
    belongs_to :user
end
