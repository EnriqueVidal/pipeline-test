$API_KEY = case key = ENV["API_KEY"]
           when nil then raise StandardError.new("You need to set the API_KEY ENV var")
           else
            key
           end
