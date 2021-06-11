let isVisible = false;
let timer = 30;
let imageSelectValue
let previousScale
let complete = false


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
    startTimer()

}



function startTimer(){
    setInterval( function(){
        document.getElementById("timer").innerHTML = timer
        timer = timer - 1
        if(timer === 1 && complete === false){
            document.location.reload()
        }
    }, 1000)
}

async function verify(){
    let id = imageSelectValue
    let indice = document.getElementById("indice").innerHTML
    const res = fetch("http://localhost:8080/capchat/verify", {
        method: "POST",
        headers: {

            'Accept' : "application/json",
            'Content-type': "application/json"
        },
        body: JSON.stringify({
            indice: indice ,
            id: id
        })
    })

    const status = (await res).status
    let card = document.getElementById("card")
    if(status === 200 ){
        document.getElementById("res").innerHTML = "Tu n'est pas un robot !"
        complete = true
        card.classList.remove("visible")
        card.classList.add('hidden')
    }else{
        document.location.reload()
    }
}


