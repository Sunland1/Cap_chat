let isVisible = false;
let timer = 30;
let imageSelectValue


$(document).ready(function (){

    //gestion des evènement
    $('img').click(function(){
        imageSelectValue = $(this).data('id')
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


