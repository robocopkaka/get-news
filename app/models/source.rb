class Source < ApplicationRecord
  validate_uniqueness :name
end
