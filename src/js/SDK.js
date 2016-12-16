var SDK = {

    serverURL: "http://localhost:5000/api",

    request: function (options, cb) {

        //Perform XHR
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: function (data, status, xhr) {
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },

    /**
     * Metode der logger brugeren ind - password får tildelt et SALT og hashes
     * @param username
     * @param password
     * @param cb
     */
    login: function (username, password, cb) {


        let SALT = "n0zaCTADRUuTb@JUp01n%5@(l@IAaLlZ";

        //Password får SALT og bliver hashet
        let passWithSalt = password + SALT;
        let hashedPassWithSalt = md5(passWithSalt);

        //Det hashet password får endnu et SALT og bliver hashet igen
        let passWithSalt2 = hashedPassWithSalt + SALT;
        let hashedPassWithSalt2 = md5(passWithSalt2);

        this.request({
                data: {
                    cbsMail: username,
                    password: hashedPassWithSalt2

                },


                url: "/login",
                method: "POST"
            },

            function (err, data) {

                //On login-error
                if (err) return cb(err);

                SDK.Storage.persist("userId", data.id);
                SDK.Storage.persist("type", data.type);


                cb(null, data);

            });

    },

    /**
     * Metode der henter lectures
     */
    Lectures: {
        getById: function (id, cb) {
            SDK.request({
                method: "GET",
                url: "/lecture/" + id
            }, cb);
        }
    },

    /**
     * Metode der henter courses
     */
    Course: {
        getById: function (cb) {

            $.ajax({
                url: SDK.serverURL + "/course/" + SDK.Storage.load("userId"),
                method: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    cb(null, data)
                }
            });

        }
    },


    /**
     * Metoder der henter og opretter reviews
     */
    LectureReview: {
        getAll: function (cb) {
            SDK.request({
                method: "GET",
                url: "/review/lecture/" + SDK.Storage.load("lectureId"),
                headers: {filter: {include: ["id", "userId", "lectureId", "rating", "comment", "isDeleted"]}}
            }, cb);

        },
        create: function (data, cb) {
            SDK.request({method: "POST", url: "/" + SDK.Storage.load("type") + "/review/", data: data,}, cb);
        }
    },


    /**
     * Metode der sletter reviews
     */
    DeleteReview: {
        deleteReview: function (data, cb) {
            SDK.request({
                data: {
                    id: data
                },
                method: "DELETE",
                url: "/" + SDK.Storage.load("type") + "/deletereview/"
            }, cb);
        }
    },

    /**
     * Metode der henter en brugers reviews
     */
    UserReview: {
        getAll: function (cb) {
            SDK.request({
                method: "GET",
                url: "/review/user/" + SDK.Storage.load("userId"),
                headers: {filter: {include: ["id", "userId", "lectureId", "rating", "comment", "isDeleted"]}}
            }, cb);
        },
    },


    /**
     * Metode der logger brugeren ud og nulstiller dennes brugerdata
     */
    logOut: function () {
        SDK.Storage.remove("userId");
        SDK.Storage.remove("type");
    },


    Storage: {
        prefix: "storeSDK",
        persist: function (key, value) {
            window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: function (key) {
            var val = window.localStorage.getItem(this.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: function (key) {
            window.localStorage.removeItem(this.prefix + key);
        }
    },


};