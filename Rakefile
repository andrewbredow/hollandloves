require "dotenv"
require "rest_client"
require "pry"

Dotenv.load

desc "Build the site"
task :build do
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

desc "Renew the SSL certificate"
task :renew_ssl do
  tmp = Dir.tmpdir
  command = %{
  AWS_ACCESS_KEY_ID="#{ENV["AWS_ACCESS_KEY_ID"]}" \
  AWS_SECRET_ACCESS_KEY="#{ENV["AWS_SECRET_ACCESS_KEY"]}" \
  certbot --agree-tos -a certbot-s3front:auth \
  --logs-dir #{tmp} \
  --config-dir #{tmp} \
  --work-dir #{tmp} \
  --renew-by-default \
  --text \
  --certbot-s3front:auth-s3-bucket #{ENV["S3_BUCKET"]} \
  -i certbot-s3front:installer \
  --certbot-s3front:installer-cf-distribution-id #{ENV["CF_DISTRIBUTION_ID"]} \
  -d hollandloves.org
  }
  system command
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
