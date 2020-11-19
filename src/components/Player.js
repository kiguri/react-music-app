import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlay, 
    faAngleLeft, 
    faAngleRight ,
    faPause
} from '@fortawesome/free-solid-svg-icons'

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, songs, setCurrentSong }) => {
    //States
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    //Playsong handler
    const playHandler = () => {
        isPlaying 
        ? audioRef.current.pause()
        : audioRef.current.play()

        setIsPlaying(!isPlaying)
    }

    //auto play when skip or select song
    const autoPlayHandler = () => {
        if (!isPlaying)
            return
        audioRef.current.play()
    }

    //Time load handler 
    const timeLoadHandler = e => {
        setSongInfo({
            ...songInfo,
            currentTime: e.target.currentTime,
            duration: e.target.duration
        })
    }

    //Time update handler
    const timeUpdateHandler = e => {
        setSongInfo({
            ...songInfo,
            currentTime: e.target.currentTime
        })
    }

    //Drag handler
    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    //Handler skip back(-1) or forward(1)
    const skipHandler = (direction) => {
        if (typeof direction !== 'number') {
            return
        } 

        let index = songs.indexOf(currentSong) + direction

        if (index < 0) {
            index = songs.length - 1
        }
        if (index > songs.length - 1) {
            index = 0
        }
        
        setCurrentSong(songs[index])
        
    }

    //Conver time to MM:SS
    const formatTime = (time) => {
        return Math.floor(time/ 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }

    return ( 
        <div className='player'>
            <div className='time-control'>
                <p>{formatTime(songInfo.currentTime)}</p>
                <input 
                    type='range'
                    min={0} 
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                />
                <p>{formatTime(songInfo.duration)}</p>
            </div>

            <div className='play-control'>
                <FontAwesomeIcon 
                    onClick={() => skipHandler(-1)}
                    className='skip-back' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon 
                    onClick={() => skipHandler(1)}
                    className='skip-forward' size='2x' icon={faAngleRight} />
            </div>
            
            <audio 
                onLoadedMetadata={timeLoadHandler}
                onTimeUpdate={timeUpdateHandler}
                onLoadedData={autoPlayHandler}
                ref={audioRef} 
                src={currentSong.audio} 
            />
        </div>
     );
}
 
export default Player;