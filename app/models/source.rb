class Source < ApplicationRecord
  validate_uniqueness_of :name, :shortcode
end
