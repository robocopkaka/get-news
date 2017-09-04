class Source < ApplicationRecord
  validates_uniqueness_of :shortcode
end
