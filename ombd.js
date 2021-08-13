// http://www.omdbapi.com/?i=tt3896198&apikey=72af88a9
window.addEventListener('DOMContentLoaded',()=>{

    const geAlldata = async (url)=>{
        const response = await fetch(url)
        return response.json()
    }

/*
Poster: "https://m.media-amazon.com/images/M/MV5BMTQxOTA2NDUzOV5BMl5BanBnXkFtZTgwNzY2MTMxMzE@._V1_SX300.jpg"
Title: "Fast & Furious 7"
Type: "movie"
Year: "2015"
*/
    var dropdown=document.getElementById('floatingSelect')
    let date=new Date()
    let max=date.getFullYear()
    let min=1800
    var html=`<option value="select">select year</option>`
    for(let i=max; i>=min; i--){
        html +=`<option value="${i}">${i}</option>`
    }
    dropdown.innerHTML=html
    var searchBtn=document.getElementById("search");
    searchBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        let text=document.getElementById("title")
        let years=document.getElementById("floatingSelect")
        let year=years.options[years.selectedIndex].value
        text=text.value.split(' ')
        text=text.join('')
        geAlldata(`http://www.omdbapi.com/?i=tt3896198&apikey=72af88a9&s='${text}'&y=${year}`).then((data)=>{
            let divisionCard=document.getElementById("FLEX")
            console.log(data)
            var cardData=``
                for(let content of data.Search){
                    let image=''
                    if(content.Poster=='N/A'){
                        image='./deafult.jpg'
                    }
                    else{
                        image=content.Poster
                    }
                    //console.log(content)
                    cardData+=`
                    <div class="card element" id="carddata" style="width: 14rem;">
                        <img src='${image}' class="card-img-top" alt="..." id='${content.Title}'>
                    </div>
                    `  
                }
            divisionCard.innerHTML=cardData
        }).catch((data)=>{

        })
    })

    var cardClick=document.getElementById('FLEX')
    cardClick.addEventListener('click', (e)=>{
        console.log(e.target.id)
        sessionStorage.setItem("id", e.target.id)
        window.open('./index.html', '_self')
    })
})