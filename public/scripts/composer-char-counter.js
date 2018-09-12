$(document).ready(function() {
    console.log('DOM is Ready');
   
    $('textarea').bind("keyup", function(event){
        let maxLength = 140;
        let currentLength = $(this).val().length;
        var remainingLength = maxLength - currentLength;
        var counter = $(this).parent().find(".counter").html(remainingLength);

        if(remainingLength < 0) {
            counter.addClass("red")
        } else {
            counter.removeClass("red")
        }
    })
});

