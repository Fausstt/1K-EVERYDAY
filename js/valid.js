$(document).ready(function () {
    // Custom method to validate username
    $.validator.addMethod(
        "usernameRegex",
        function (value, element) {
            return this.optional(element) || regex_first_last_name.test(value);
        },
        "Name must be more than 2 characters long, without special characters or spaces"
    );

    $.validator.addMethod(
        "lastusernameRegex",
        function (value, element) {
            return this.optional(element) || regex_first_last_name.test(value);
        },
        "Last name must be more than 2 characters long, without special characters or spaces"
    );

    $.validator.addMethod(
        "passwordRegex",
        function (value, element) {
            return (
                this.optional(element) ||
                (/[a-z]/.test(value) &&
                    /[0-9]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /^[0-9A-Za-z]+$/.test(value))
            );
        },
        'Password must be between 8-12 characters in length, including letters (A-Z, a-z) and numbers (0-9). Without any special symbols (^@()#*+/"?!=.{}~`&) and spaces'
    );

    $.validator.addMethod(
        "phoneRegex",
        function (value, element) {
            return this.optional(element) || /^(\d[- ]?){7,11}$/.test(value);
        },
        "The phone must be from 7 to 11 characters, without special characters"
    );

    $(function () {
        var form = $("#myform");
        form.validate({
            onfocusout: function (element) {
                if (
                    this.currentElements.length != 0 &&
                    this.currentElements[0].name == "email"
                ) {
                    rebuidEmail($(this.currentElements[0]));
                }
                this.element(element);
                $(element).valid();
                if ($(element).hasClass("phone")) {
                    if ($(".phone").valid() === false) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(28%) sepia(92%) saturate(3438%) hue-rotate(346deg) brightness(98%) contrast(116%)"
                        );
                        $(".selected-dial-code").css("color", "#B90000");
                    }

                    if ($(".phone").valid() === true) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(47%) sepia(53%) saturate(5520%) hue-rotate(108deg) brightness(99%) contrast(107%)"
                        );
                        $(".selected-dial-code").css("color", "#4C8800");
                    }
                }
            },
            onkeyup: function (element) {
                $(element).valid();
                $('[name="' + element.name + '"]').val(element.value);
                if ($(element).hasClass("phone")) {
                    if ($(".phone").valid() === false) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(28%) sepia(92%) saturate(3438%) hue-rotate(346deg) brightness(98%) contrast(116%)"
                        );
                        $(".selected-dial-code").css("color", "#B90000");
                    }

                    if ($(".phone").valid() === true) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(47%) sepia(53%) saturate(5520%) hue-rotate(108deg) brightness(99%) contrast(107%)"
                        );
                        $(".selected-dial-code").css("color", "#4C8800");
                    }
                }
            },

            rules: {
                first_name: {
                    required: true,
                    usernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                last_name: {
                    required: true,
                    lastusernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                password: {
                    required: true,
                    passwordRegex: true,
                    minlength: 8,
                    maxlength: 12,
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: {
                    phoneRegex: true,
                    required: true,
                },
            },
            messages: {
                first_name: {
                    required: "The first name field is required",
                    minlength: "The first name must be at least 2",
                    maxlength: "First name can be a maximum of 25",
                },

                last_name: {
                    required: "The last name field is required",
                    minlength: "The last name must be at least 2",
                    maxlength: "Surname can be a maximum of 25",
                },
                password: {
                    required: "Passordfelt kreves",
                    minlength: "Passordet må være minst 8 tegn",
                    maxlength: "Passordet kan ikke overstige 12 tegn",
                },
                email: {
                    required: "The e-mail field is required",
                    email: "The e-mail must be a valid address",
                },
                phone: {
                    required: "The phone is required",
                },
            },
            submitHandler: function (form, event) {
                event.preventDefault();
                $(".preloader").show();
                $("input[name='first_name']").each(function () {
                    $(this).val(
                        $(this)
                            .val()
                            .substr(0, 60)
                            .replace(/[.-]/g, " ")
                            .replace(/\s\s+/g, " ")
                    );
                });
                $("input[name='last_name']").each(function () {
                    $(this).val(
                        $(this)
                            .val()
                            .substr(0, 60)
                            .replace(/[.-]/g, " ")
                            .replace(/\s\s+/g, " ")
                    );
                });
                var msg = $(form).serialize();
                var linkAdress = makeSendAdress();
                console.log("linkAdress= " + linkAdress);
                $.post(linkAdress, msg)
                    .done(function (data) {
                        var domainForPixel = $.urlParam("domain");
                        var lead = $("[name=first_name]").val();

                        adress_redir = "index.html";
                        if (domainForPixel != null) {
                            $("body").prepend(
                                '<iframe width="1" height="1" alt="" style="display:none" src="https://' +
                                    decodeURIComponent(domainForPixel) +
                                    '"></iframe>'
                            );
                        }

                        // $(".lead-name").text(lead);
                        // $('.btn-send-thanks').attr('href', adress_redir);
                        // if ($.urlParam('noautologin') == 1) {
                        //     setTimeout(function(){window.location = adress_redir}, 3000)
                        //     return true;
                        // }

                        // $('#finishPopup').fadeIn(150);

                        alert("Your application is accepted !!!");
                        setTimeout(async function () {
                            window.location = adress_redir;
                        }, 1000);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        $(".preloader").hide();
                        if (true) {
                            console.log("hd");
                            var obj_data = JSON.parse(jqXHR.responseText);
                            for (key in obj_data.errors) {
                                if (key == "CROB") {
                                    window.location = obj_data.errors[key];
                                } else {
                                    alert(obj_data.errors[key]);
                                }
                            }
                        } else {
                            alert("Register form field error");
                            console.log(jqXHR);
                        }
                    });
            },
        });
    });

    $(function () {
        var form = $("#myform2");
        form.validate({
            onfocusout: function (element) {
                if (
                    this.currentElements.length != 0 &&
                    this.currentElements[0].name == "email"
                ) {
                    rebuidEmail($(this.currentElements[0]));
                }
                this.element(element);
                $(element).valid();
            },
            onkeyup: function (element) {
                $(element).valid();
                $('[name="' + element.name + '"]').val(element.value);
            },

            rules: {
                first_name: {
                    required: true,
                    usernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                last_name: {
                    required: true,
                    lastusernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                password: {
                    required: true,
                    passwordRegex: true,
                    minlength: 8,
                    maxlength: 12,
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: {
                    phoneRegex: true,
                    required: true,
                },
            },
            messages: {
                first_name: {
                    required: "The first name field is required",
                    minlength: "The first name must be at least 2",
                    maxlength: "First name can be a maximum of 25",
                },

                last_name: {
                    required: "The last name field is required",
                    minlength: "The last name must be at least 2",
                    maxlength: "Surname can be a maximum of 25",
                },
                password: {
                    required: "Passordfelt kreves",
                    minlength: "Passordet må være minst 8 tegn",
                    maxlength: "Passordet kan ikke overstige 12 tegn",
                },
                email: {
                    required: "The e-mail field is required",
                    email: "The e-mail must be a valid address",
                },
                phone: {
                    required: "The phone is required",
                },
            },
            submitHandler: function (form, event) {
                event.preventDefault();
                $(".preloader").show();
                $("input[name='first_name']").each(function () {
                    $(this).val(
                        $(this)
                            .val()
                            .substr(0, 60)
                            .replace(/[.-]/g, " ")
                            .replace(/\s\s+/g, " ")
                    );
                });
                $("input[name='last_name']").each(function () {
                    $(this).val(
                        $(this)
                            .val()
                            .substr(0, 60)
                            .replace(/[.-]/g, " ")
                            .replace(/\s\s+/g, " ")
                    );
                });
                var msg = $(form).serialize();
                var linkAdress = makeSendAdress();
                console.log("linkAdress= " + linkAdress);
                $.post(linkAdress, msg)
                    .done(function (data) {
                        var domainForPixel = $.urlParam("domain");
                        var lead = $("[name=first_name]").val();

                        adress_redir = "index.html";
                        if (domainForPixel != null) {
                            $("body").prepend(
                                '<iframe width="1" height="1" alt="" style="display:none" src="https://' +
                                    decodeURIComponent(domainForPixel) +
                                    '"></iframe>'
                            );
                        }

                        // $(".lead-name").text(lead);
                        // $('.btn-send-thanks').attr('href', adress_redir);
                        // if ($.urlParam('noautologin') == 1) {
                        //     setTimeout(function(){window.location = adress_redir}, 3000)
                        //     return true;
                        // }

                        // $('#finishPopup').fadeIn(150);

                        alert("Your application is accepted !!!");
                        setTimeout(function () {
                            window.location = adress_redir;
                        }, 1000);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        $(".preloader").hide();
                        if (true) {
                            var obj_data = JSON.parse(jqXHR.responseText);
                            for (key in obj_data.errors) {
                                if (key == "CROB") {
                                    window.location = obj_data.errors[key];
                                } else {
                                    alert(obj_data.errors[key]);
                                }
                            }
                        } else {
                            alert("Register form field error");
                            console.log(jqXHR);
                        }
                    });
            },
        });
    });

    $(function () {
        var form = $("#myform");
        form.validate({
            onfocusout: function (element) {
                if (
                    this.currentElements.length != 0 &&
                    this.currentElements[0].name == "email"
                ) {
                    rebuidEmail($(this.currentElements[0]));
                }
                this.element(element);
                $(element).valid();
                if ($(element).hasClass("phone")) {
                    if ($(".phone").valid() === false) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(28%) sepia(92%) saturate(3438%) hue-rotate(346deg) brightness(98%) contrast(116%)"
                        );
                        $(".selected-dial-code").css("color", "#B90000");
                    }

                    if ($(".phone").valid() === true) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(47%) sepia(53%) saturate(5520%) hue-rotate(108deg) brightness(99%) contrast(107%)"
                        );
                        $(".selected-dial-code").css("color", "#4C8800");
                    }
                }
            },
            onkeyup: function (element) {
                $(element).valid();
                $('[name="' + element.name + '"]').val(element.value);
                if ($(element).hasClass("phone")) {
                    if ($(".phone").valid() === false) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(28%) sepia(92%) saturate(3438%) hue-rotate(346deg) brightness(98%) contrast(116%)"
                        );
                        $(".selected-dial-code").css("color", "#B90000");
                    }

                    if ($(".phone").valid() === true) {
                        $(".phone__icon").css(
                            "filter",
                            "invert(47%) sepia(53%) saturate(5520%) hue-rotate(108deg) brightness(99%) contrast(107%)"
                        );
                        $(".selected-dial-code").css("color", "#4C8800");
                    }
                }
            },

            rules: {
                first_name: {
                    required: true,
                    usernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                last_name: {
                    required: true,
                    lastusernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                password: {
                    required: true,
                    passwordRegex: true,
                    minlength: 8,
                    maxlength: 12,
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: {
                    phoneRegex: true,
                    required: true,
                },
            },
            messages: {
                first_name: {
                    required: "The first name field is required",
                    minlength: "The first name must be at least 2",
                    maxlength: "First name can be a maximum of 25",
                },

                last_name: {
                    required: "The last name field is required",
                    minlength: "The last name must be at least 2",
                    maxlength: "Surname can be a maximum of 25",
                },
                password: {
                    required: "Passordfelt kreves",
                    minlength: "Passordet må være minst 8 tegn",
                    maxlength: "Passordet kan ikke overstige 12 tegn",
                },
                email: {
                    required: "The e-mail field is required",
                    email: "The e-mail must be a valid address",
                },
                phone: {
                    required: "The phone is required",
                },
            },
            submitHandler: function (form, event) {
                event.preventDefault();
                $(".preloader").show();
                $("input[name='first_name']").each(function () {
                    $(this).val(
                        $(this)
                            .val()
                            .substr(0, 60)
                            .replace(/[.-]/g, " ")
                            .replace(/\s\s+/g, " ")
                    );
                });
                $("input[name='last_name']").each(function () {
                    $(this).val(
                        $(this)
                            .val()
                            .substr(0, 60)
                            .replace(/[.-]/g, " ")
                            .replace(/\s\s+/g, " ")
                    );
                });
                var msg = $(form).serialize();
                var linkAdress = makeSendAdress();
                console.log("linkAdress= " + linkAdress);
                $.post(linkAdress, msg)
                    .done(function (data) {
                        var domainForPixel = $.urlParam("domain");
                        var lead = $("[name=first_name]").val();

                        adress_redir = "index.html";
                        if (domainForPixel != null) {
                            $("body").prepend(
                                '<iframe width="1" height="1" alt="" style="display:none" src="https://' +
                                    decodeURIComponent(domainForPixel) +
                                    '"></iframe>'
                            );
                        }

                        // $(".lead-name").text(lead);
                        // $('.btn-send-thanks').attr('href', adress_redir);
                        // if ($.urlParam('noautologin') == 1) {
                        //     setTimeout(function(){window.location = adress_redir}, 3000)
                        //     return true;
                        // }

                        // $('#finishPopup').fadeIn(150);

                        alert("Your application is accepted !!!");
                        setTimeout(function () {
                            window.location = adress_redir;
                        }, 1000);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        $(".preloader").hide();
                        if (true) {
                            var obj_data = JSON.parse(jqXHR.responseText);
                            for (key in obj_data.errors) {
                                if (key == "CROB") {
                                    window.location = obj_data.errors[key];
                                } else {
                                    alert(obj_data.errors[key]);
                                }
                            }
                        } else {
                            alert("Register form field error");
                            console.log(jqXHR);
                        }
                    });
            },
        });
    });
});

// function makeSendAdress() {
//     var protocol = location.protocol;
//     var tmp = location.hostname.replace(/[a-z]{2}\./, '');
//     tmp = protocol + '//cabinet.' + tmp + '/api/register';
//     return tmp;
// }
