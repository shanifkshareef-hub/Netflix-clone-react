import React from 'react'
import { useEffect } from 'react'
import './RowPost.css'
import {imageUrl,API_KEY} from '../../constants/constants'
import axios from '../../axios'
import { useState } from 'react'
import Youtube from 'react-youtube'


function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [UrlId, setUrlId] = useState('')
     
    useEffect(() => {
    
    axios.get(props.url).then(response=>{
        console.log(response.data)
        setMovies(response.data.results)

    }).catch(err=>{
       
      //  alert('error')
    })
      
    }, [])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        }
}
const handleMovie = (id)=>{
    console.log( 'id is'+id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
        console.log(response.data)
        if(response.data.results.length!==0){
            setUrlId(response.data.results[0])
        }
    })
}
    
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj)=>
                     <img onClick={()=>{handleMovie(obj.id)}} className={props.isSmall ? 'small_poster' : 'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`}/>
                )}
                        
            </div>
          { UrlId &&  <Youtube videoId={UrlId.key} opts={opts}  />}
        </div>
    )
}



export default RowPost
