desc "Build the site"
task :build do
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

desc "Push the site to S3"
task :deploy => [:build] do
  system "bundle exec s3_website push"
end
