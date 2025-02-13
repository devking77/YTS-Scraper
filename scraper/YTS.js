"use strict";

Object.defineProperty(exports, "__esModule", { value: true });




const axios=require("axios")
const cheerio=require('cheerio')


const baseUrl="https://yts.mx/"




const headers={

    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
    // "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
}

class YTS{

    constructor(){}


    async getPopular(){

        const popular=[]
        try{
            const data= await axios.get(baseUrl,{"headers":headers})
            // if (data.status!==200){
            //     this.getPopular()
            //     console.log(data.status)
            //     return
                

            // }


            const $=cheerio.load(data?.data)
            // const title=$("#wrapper")._root
            // console.log(data)

            // const popular=$(".popular-downloads")
            // console.log($('#popular-downloads .row').eq(1).find('.browse-movie-wrap').length)

            
            $('#popular-downloads .row').eq(1).find('.browse-movie-wrap').each((index,element)=>{

                const title=$(element).find('.browse-movie-title').text()
                const year=$(element).find('.browse-movie-year').text()
                const url=$(element).find('.browse-movie-link').attr('href')
                const img=$(element).find('.img-responsive').attr('src')
                const movie_id=url.split('movies/')[1]
                
                const _data={"title":title,"release_year":year,"url":url,"poster":img,"movie_id":movie_id}
                popular.push(_data)

            })

            return popular

    }catch(err){
        

        console.log("Status error")
        return "Pls try again, 545"
    }


    }



    async getDiscover(page=1){

        const discover=[]
        try{
            const data= await axios.get(baseUrl+`browse-movies?page=${page}`,{"headers":headers})
            // if (data.status!==200){
            //     console.log(data.status)
            //     return
                

            // }


            const $=cheerio.load(data?.data)
           

            
            $('.browse-movie-wrap').each((index,element)=>{

                const title=$(element).find('.browse-movie-title').text()
                const year=$(element).find('.browse-movie-year').text()
                const url=$(element).find('.browse-movie-link').attr('href')
                const img=$(element).find('.img-responsive').attr('src')
                const movie_id=url.split('movies/')[1]
                
                const _data={"title":title,"release_year":year,"url":url,"poster":img,"movie_id":movie_id}
                discover.push(_data)

            })

            return discover

    }catch(err){

        console.log("Status error")
        return "Pls try again, 545"
    }



    }





    async search(query){

        const search_results=[]
        try{
            
            const data= await axios.get(baseUrl+`browse-movies/${encodeURIComponent(query)}/all/all/0/latest/0/all`,{"headers":headers})
            // if (data.status!==200){
            //     console.log(data.status)
            //     return
            // }


            const $=cheerio.load(data?.data)
           

            
            $('.browse-movie-wrap').each((index,element)=>{

                const title=$(element).find('.browse-movie-title').text()
                const year=$(element).find('.browse-movie-year').text()
                const url=$(element).find('.browse-movie-link').attr('href')
                const img=$(element).find('.img-responsive').attr('src')
                const movie_id=url.split('movies/')[1]
                
                const _data={"title":title,"release_year":year,"url":url,"poster":img,"movie_id":movie_id}
                search_results.push(_data)

            })

            return search_results

    }catch(err){

        console.log("Status error")
        return "Pls try again, 545"
    }

    }




    async getMovieDetails(movie_id){

        // const search_results=[]
        try{
            
            const {data}= await axios.get(baseUrl+`movies/${movie_id}`,{"headers":headers})
            
            const $=cheerio.load(data)
            

            const title=$("#movie-info").find('h1').text()
            const release_year=$("#movie-info").find('h2').eq(0).text()
            const img=$("#movie-poster").find('img').attr('src')
            


            let magnet_links=[]

            $('.modal-torrent').each((index,element)=>{

                const magnet_url=$(element).find('.magnet-download').attr('href')
                const quality=`${$(element).find(".modal-quality").find('span').text()} ${$(element).find('.quality-size').eq(0).text()}`
                const file_size=$(element).find('.quality-size').eq(1).text()

                const download={"magnet_url":magnet_url,"quality":quality,"downlaod_size":file_size}
                magnet_links.push(download)

            })

            let torrent_links=[]
            $("#movie-info").find(".hidden-xs").find('a').each((index,element)=>{
                const torrent_link=$(element).attr('href')
                const torrent_quality=$(element).text()

                const torrent={"torrent_link":torrent_link,"quality":torrent_quality}
                torrent_links.push(torrent)

            })



            const details={"title":title,"release_year":release_year,"poster":img,"magnet_lins":magnet_links,"movie_id":movie_id,"torrent_links":torrent_links}


            
            
            return details

    }catch(err){

        console.log("Status error")
        return "Pls try again, 545"
        // console.trace()
    }



    }




}





(async ()=>{
    const yts=new YTS()
    // const popular=await yts.getPopular()
    // console.log(popular);
    // const discover=await yts.getDiscover()
    // console.log(discover)
    // const search_results=await yts.search('avengers 2019')
    // console.log(search_results)
    // const movie=await yts.getMovieDetails("avengers-endgame-2019")
    // console.log(movie)



})();

module.exports=YTS