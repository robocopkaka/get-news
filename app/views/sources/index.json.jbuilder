json.sources @sources.all do |source|
  json.id source.id
  json.name source.name
  json.shortcode source.shortcode
  json.logo name.logo
end
