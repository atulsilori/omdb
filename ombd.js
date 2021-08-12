// http://www.omdbapi.com/?i=tt3896198&apikey=72af88a9
window.addEventListener('DOMContentLoaded',()=>{
    const  getData = async (url) => {
        const response = await fetch(url)
        return response.json()
    };
    
    var dropdown=document.getElementById('floatingSelect')
    let max=2021
    let min=1850
    var html=`<option value="select">select year</option>`
    for(let i=min; i<=max; i++){
        html +=`<option value="${i}">${i}</option>`
    }
    dropdown.innerHTML=html
    var searchBtn=document.getElementById("search");
    searchBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        let text=document.getElementById("title")
        let years=document.getElementById("floatingSelect")
        let year=years.options[years.selectedIndex].value
        if(year=='select')
            year=''
        let data=text.value;
        const api=`http://www.omdbapi.com/?apikey=72af88a9&t=${data}&y=${year}`;
        console.log(api)
        getData(api).then((data)=>{
            console.log(data)
            let title=document.getElementById("title_");
            let rating=document.getElementById("rating");
            let plot=document.getElementById("plot");
            let image=document.getElementById("image");
            let date=data.Released.split(" ")[2]
            let score=parseInt(data.imdbRating[0], 10)
            score=Math.ceil(rating/10*5)
            let star='<i class="icon-star"></i>'
            let rate=''
            for(let i=0; i<score; i++){
                rate+=star
            }

            title.innerHTML=data.Title+`(${date})`
            rating.innerHTML=rate
            plot.innerHTML=data.Plot
            image.src=data.Poster
        })
    })
})


