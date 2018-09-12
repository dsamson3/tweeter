$(document).ready(function() {
    console.log('DOM is Ready');
    var textarea = document.querySelector('textarea');
    textarea.addEventListener("keyup", function(event){
        let maxLength = 140;
        let currentLength = $(this).val().length;
        var change = maxLength - currentLength
        $(this).select(".counter").html(maxLength);
    console.log(find(".counter"))    
    })
});

