const  getData = async (url) => {
    const response = await fetch(url)
    return response.json()
};

        let imdbID=sessionStorage.getItem("id")
        const api=`http://www.omdbapi.com/?apikey=72af88a9&i=${imdbID}`;
        console.log(api)
        getData(api).then((data)=>{
            console.log(data)
            let title=document.getElementById("title_");
            let rating=document.getElementById("rating");
            let plot=document.getElementById("plot");
            let image=document.getElementById("image");
            let actors=document.getElementById("actors")
            let length=document.getElementById("length")
            let genre=document.getElementById("genre")
            let country=document.getElementById("country")

            let date=data.Released.split(" ")[2]

            let scoreArr=data.imdbRating.split('.')
            let score=parseInt(scoreArr[0], 10)
            console.log(scoreArr)
            score=Math.floor(score/10*5)
            console.log(score)
            let star='<i class="fa fa-star"></i>'
            let halfstar='<i class="fa fa-star-half-o"></i>'
            let rate=''
            for(let i=0; i<score; i++){
                rate+=star
            }
            if(scoreArr[1]!='0'){
                rate+=halfstar
            }
            console.log(rate)

            let genreArr=data.Genre.split(', ')
            let Genre=``
            for(let i=0; i<genreArr.length; i++){
                Genre+=`<span class="badge rounded-pill bg-secondary">${genreArr[i]}</span> `
            }

            let countryArr=data.Country.split(', ')
            let Country=``
            for(let i=0; i<countryArr.length; i++){
                Country+=`<span class="badge rounded-pill bg-primary">${countryArr[i]}</span> `
            }           

            let actorNameLink=''
            let actorarr=data.Actors.split(', ')
            for(let name of actorarr){
                actorNameLink+=`<a href='https://en.wikipedia.org/wiki/${name}' target='_blank'>${name}</a>, `
            }
            actorNameLink=actorNameLink.substr(0, actorNameLink.length-2)
            title.innerHTML=data.Title+(date!=undefined?`(${date})`:'')
            rating.innerHTML=rate
            plot.innerHTML=data.Plot
            image.src=data.Poster
            actors.innerHTML=actorNameLink
            length.innerHTML=`<i class="fa fa-clock-o"></i> ${data.Runtime}`
            genre.innerHTML=Genre
            country.innerHTML=Country
        })