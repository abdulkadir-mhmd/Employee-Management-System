$(document).ready(function(){  
 
    // Badhan tir tir kaas oo kiciya codsiga ajax ee tirtirida xogta ay khusayso.
    // Tan waxa loo sameeyaa kaliya si loo muujiyo in codsiga ajax sidoo kale loo isticmaali karo hawlaha.  
$('.delete').on('click',()=>{
    $.ajax({
    type:'DELETE',
        success: function(data){
            location.assign('/')
        }
    });
    return false;
});

    
    // Search input oo ka dhigi doona page-ka inuu soo muujiyo kaliya shaqaalaha leh alifbeetada magaciisa oo la mid ah mida lasoo galiyay.
    $('.search').on('keyup',(e)=>{
        const term = e.target.value;
        const t = $('.nam');
        
        Array.from(t).forEach(function(ts){
            const x = ts.innerText;
            if(x.indexOf(term)==-1){
                ts.parentElement.parentElement.parentElement.parentElement.style.display="none";
            }
            else{
                ts.parentElement.parentElement.parentElement.parentElement.style.display="block";
            }
        })
    })
});