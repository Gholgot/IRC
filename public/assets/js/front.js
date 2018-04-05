$(document).ready(function () {
    //____________ Functions _________    
    // This function is going to load the content into the modal and make is apear
    function write_modal(content) {
        $("#modal_content").html(content);
        $("#modal_window").slideDown("600");
        modal_remove();    
    }
    
    // This function is going to make notification popup
    function show_response(bool, message) {
		$('.alert-box').html('');
		if (bool === true) {
			$('.alert-box').append("<div class='alert alert-valid is-rounded'><p>" + message + "</p><i class='fas fa-times remove_element'></i></div>");
		} else {
			if (typeof (message) == "object") {
				message.forEach(function (error) {
					$(".alert-box").append("<div class='alert alert-error is-rounded'><p>" + error + "</p><i class='fas fa-times remove_element'></i></div>");
				});
			} else {
				$(".alert-box").append("<div class='alert alert-error is-rounded'><p>" + message + "</p><i class='fas fa-times remove_element'></i></div>");
			}
        }
        
		$('.remove_element').click(function () {
            $(this).parent().toggle( "slide" );
			setTimeout(function () {
				$(this).parent().remove();
			}, 400);
		})
    }
    
    // This function is going to create the event on modal-cross
    function modal_remove() {
        $(".modal_cross").click(function () {
            $('#modal_window').slideUp("300");
            setTimeout(function () {
                $('#modal_content').html('');
            }, 600);
        });
        $('.send_form').click(function() {
            var input_values = {};
            $(".form").serializeArray().forEach(function(input) {
                input_values[input.name] = input.value;
            });
            send_form(input_values, $('.form').attr('name'));
        })
    }

    // This function is going to check if there is a token stored in localStorage
    function token_exists() {
        var token = localStorage.getItem('token');
        if(token.length = 0) {
            return false;
        }
        return true;
    }        
    
    //___________ AJAX Request __________
    // This function is going to resquest the modal content based on the name
    function load_modal(name) {
        $.ajax({
            url: "/modal/" + name, 
            success: function(result){
                if(result.length > 0) {
                    write_modal(result);
                }
                else {
                    console.log('Modal does not exist !');
                }
            }});
        }

        function send_form(inputs, form_name) {
            $.ajax({
                url: "/user/" + form_name,
                method: "POST",
                headers: {"authorization": localStorage.getItem('token')},
                data: inputs,
                success: function(result) {
                    if(result.token) {
                        console.log(result);
                        show_response(result.bool, result.message);
                        localStorage.setItem('token', result.token);
                    } else {
                        show_response(result.bool, result.message);
                    }
                },
                fail: function(cause) {
                    console.log(cause);
                }
            })
        }
        
        //____________ Event Listener _________

        $('.modal_link').click(function() {
            var modal_name = $(this).html().toLowerCase();
            load_modal(modal_name);
        })
    })