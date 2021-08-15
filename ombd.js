// http://www.omdbapi.com/?i=tt3896198&apikey=72af88a9
window.addEventListener('DOMContentLoaded',()=>{

    var maxpages=0
    var currentPage=1
    var pageCounter=document.getElementById('pagecounter')

    let divisionCard=document.getElementById("FLEX")
    const geAlldata = async (url)=>{
        const response = await fetch(url)
        return response.json()
    }
    
    function showToast(condition, message) {
        var toastLiveExample = document.getElementById('liveToast')
        if (condition=="False") {
              var toast = new bootstrap.Toast(toastLiveExample)
              toast.show()
              document.getElementById('toast').innerHTML=message
        }
    }

    const fill = (text, year, page=1)=>{
        var message=''
        var response=''
        geAlldata(`http://www.omdbapi.com/?i=tt3896198&apikey=72af88a9&s='${text}'&y=${year}&page=${page}`).then((data)=>{
            const totalResult=parseInt(data.totalResults, 10)
            maxpages=Math.ceil(totalResult/10)
            console.log(data)
            if(text==''){
                message="search textbox cannot be empty!"
                response=data.Response
                //showToast(data.Response, "search textbox cannot be empty!")
           }
           else if(text!='' && data.Response=="False"){
                message=data.Error
                response=data.Response
                //showToast(data.Response, data.message)
           }
            var cardData=``
                for(let content of data.Search){
                    let image=''
                    if(content.Poster=='N/A'){
                        //image='./deafult.jpg'
                        continue;
                    }
                    else{
                        image=content.Poster
                    }
                    //console.log(content)
                    cardData+=`
                    <div class="card element" id="carddata" style="width: 14rem;">
                        <img src='${image}' class="card-img-top" alt="..." id='${content.imdbID}'>
                    </div>
                    `  
                }
            divisionCard.innerHTML=cardData
        }).catch((data)=>{
            if(text=='' || response=="False")
                showToast(response, message)
            else
                showToast("False", "Failed to load results, ckeck your internet connection!")
        })
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
        currentPage=1
        let text=document.getElementById("title")
        let years=document.getElementById("floatingSelect")
        let year=years.options[years.selectedIndex].value
        text=text.value.split(' ')
        text=text.join('')
        fill(text, year)
        pageCounter.innerHTML=currentPage
    })

    var cardClick=document.getElementById('FLEX')
    cardClick.addEventListener('click', (e)=>{
        console.log(e.target.id)
        if(e.target.id != 'FLEX'){
            sessionStorage.setItem("id", e.target.id)
            window.open('./index.html', '_self')
        }
    })

    var prevPage = document.getElementById('prev')
    prevPage.addEventListener('click', (e)=>{
        if(currentPage>1){
            let text=document.getElementById("title")
            let years=document.getElementById("floatingSelect")
            let year=years.options[years.selectedIndex].value
            text=text.value.split(' ')
            text=text.join('')
            currentPage--
            if(text!='' && divisionCard.innerHTML!=''){
                fill(text, year, currentPage)
                pageCounter.innerHTML=currentPage
            }
                
        }
    })

    var nextPage = document.getElementById('next')
    nextPage.addEventListener('click', (e)=>{
        if(currentPage<maxpages){
            let text=document.getElementById("title")
            let years=document.getElementById("floatingSelect")
            let year=years.options[years.selectedIndex].value
            text=text.value.split(' ')
            text=text.join('')
            currentPage++
            if(text!='' && divisionCard.innerHTML!=''){
                fill(text, year, currentPage)
                pageCounter.innerHTML=currentPage
            }
        }
    })
})