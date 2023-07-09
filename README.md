Project Folder Structure 

BaghChal
    BaghChal-Services
        api
        business
        data
    BaghChal-WebApp
        api
        controllers
        middleware
        models
        routes
        test
        utils
        views
            auth
                assests
            error
                assests
            private
                assests
            public
                assests



PRIVATE:
[user] about, profile, edit profile, contact(email)

PUBLIC:
[team] about, contact

API:
used to send https calls to api in server

Express => webapp/ HTTP framework for running node servers
cors => to call this server anywhere else in the internet
axios => to make external api calls

nodemon => to see real time code changes 