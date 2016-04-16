/*

  //action="http://www.jotyourself.com/gasjot/d/login"
  //action=http://www.jotyourself.com/gasjot/d/users

module.exports = {
    handleSignUpSubmit: function(event) {
        event.preventDefault();
        var requestPayload = {"user/email": $("#email").val(),
                              "user/name": $("#fullname").val(),
                              "user/password": $("#password").val()};
        $.ajax({type: "POST",
                beforeSend: function(request) {},
                url: $(this).attr('action'),
                processData: false,
                headers: {"Content-Type": "application/vnd.fp.user-v0.0.1+json;charset=UTF-8",
                          "Accept-Language": "en-US",
                          "Accept": "application/vnd.fp.user-v0.0.1+json",
                          "r-establish-session": true},
                data: JSON.stringify(requestPayload)})
            .done(function(data) {
                console.log("inside done()");
            })
            .fail(function() {
                console.log("inside fail");
            })
            .always(function() {
                console.log("inside always()");
            });
    },

    handleLoginSubmit: function(event) {
        event.preventDefault();
        var requestPayload = {"user/username-or-email": $("#username_or_email").val(),
                              "user/password": $("#password").val()};

        $.ajax({type: "POST",
                beforeSend: function(request) {},
                url: $(this).attr('action'),
                processData: false,
                headers: {"Content-Type": "application/vnd.fp.user-v0.0.1+json;charset=UTF-8",
                          "Accept-Language": "en-US",
                          "Accept": "application/vnd.fp.user-v0.0.1+json"},
                data: JSON.stringify(requestPayload)})
            .done(function(data) {
                document.title = "Gas Jot - Welcome Back!";

            })
            .fail(function() {

            })
            .always(function() {

            });
    }
}*/
