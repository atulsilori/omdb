const api="http://www.omdbapi.com/?apikey=72af88a9";
// http://www.omdbapi.com/?i=tt3896198&apikey=72af88a9

const  getData = async (url) => {
    const response = await fetch(url)
    return response.json()
};

getData(api).then((data)=>{
    console.log(data)
})