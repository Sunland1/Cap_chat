let isVisible = false;
let timer = 30;
let imageSelectValue
let previousScale


$(document).ready(function (){

    //gestion des evènement
    $('img').click(function(){
        imageSelectValue = $(this).data('id')
        if(previousScale !== undefined){
            previousScale.css({
                "transition-duration": "500ms",
                "transition-property": "transform",
                "transform": "scale(1,1)"
            })
        }
        $(this).css({
            "transition-duration": "500ms",
            "transition-property": "transform",
            "transform": "scale(0.8,0.8)"
        })
        previousScale = $(this)

    })

})


function showPopUp(){
    let card = document.getElementById("card")
    if(isVisible){
        card.classList.remove("visible")
        card.classList.add('hidden')
    }else{
        card.classList.remove('hidden')
        card.classList.add('visible')
    }
    isVisible = !isVisible
    //startTimer()

}



function startTimer(){
    setInterval( function(){
        document.getElementById("timer").innerHTML = timer
        timer = timer - 1
    }, 1000)
}


