# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Source.create(name: "ABC News (AU)", shortcode: "abc-au", logo: "abc-au.png")
Source.create(name: "Al Jazeera English", shortcode: "al-jazeera-english", logo: "al-jazeera-english.png")
Source.create(name: "Ars Technica", shortcode: "ars-technica", logo: "ars-technica.png")
