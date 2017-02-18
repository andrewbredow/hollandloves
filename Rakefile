require "dotenv"
require "rest_client"

Dotenv.load

desc "Deploy the production site and run certbot"
task :travis => [:deploy]

desc "Build the site"
task :build do
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

desc "Push the site to S3"
task :deploy => [:build] do
  system "bundle exec s3_website push --force"
end

# npm install svgexport
desc "Generate rasterized logos based on logo svg"
task :logos => [:build] do
  temp = Tempfile.new(["logo", ".svg"])
  temp.write(File.open("_includes/logo.html", "rb").read)
  temp.close

  logo_stylesheet = File.open("_site/css/icon.css", "rb")
  css = logo_stylesheet.read.gsub(/\n/, "")

  system "svgexport #{temp.path} img/apple-touch-icon.png pad 80% 360: \"#{css}\""
  system "svgexport #{temp.path} img/favicon.png pad 60% 196: \"#{css}\""
  temp.unlink
end

desc "Build a new version of the Fontello font"
task :font do
  uri = "http://fontello.com"
  session = RestClient.post(uri, { "config" => File.new("font/config.json", "rb") })
  system "open #{uri}/#{session}"
end
