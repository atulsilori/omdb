const  getData = async (url) => {
    const response = await fetch(url)
    return response.json()
};

        let title=sessionStorage.getItem("id")
        const api=`http://www.omdbapi.com/?apikey=72af88a9&t=${title}`;
        console.log(api)
        getData(api).then((data)=>{
            console.log(data)
            let title=document.getElementById("title_");
            let rating=document.getElementById("rating");
            let plot=document.getElementById("plot");
            let image=document.getElementById("image");
            let actors=document.getElementById("actors")


            let date=data.Released.split(" ")[2]

            let score=parseInt(data.imdbRating[0], 10)
            score=Math.ceil(score/10*5)
            console.log(score)
            let star='<span class="glyphicon glyphicon-star">*</span>'
            let rate=''
            for(let i=0; i<score; i++){
                rate+=star
            }

            console.log(rate)
            let actorNameLink=''
            let actorarr=data.Actors.split(', ')
            for(let name of actorarr){
                actorNameLink+=`<a href='https://en.wikipedia.org/wiki/${name}' target='_blank'>${name}</a>, `
            }
            actorNameLink=actorNameLink.substr(0, actorNameLink.length-2)
            title.innerHTML=data.Title+`(${date})`
            rating.innerHTML=rate
            plot.innerHTML='<h5>Plot:</h5> '+data.Plot
            image.src=data.Poster
            actors.innerHTML='Cast: '+actorNameLink
        })