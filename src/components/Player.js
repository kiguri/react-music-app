import { useState, useRef, useLayoutEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlay, 
    faAngleLeft, 
    faAngleRight ,
    faPause
} from '@fortawesome/free-solid-svg-icons'

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, songs, setCurrentSong }) => {
    //Ref
    const requestRef = useRef()
    //States
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })
    const [animationPercent, setAnimationPercent] = useState(0)
    const [styleTransform, setStyleTransform] = useState({})

    useLayoutEffect(() => {
        const animate = () => {
            setStyleTransform({
                transform: `translateX(${animationPercent}%)`
            })
            requestRef.current = requestAnimationFrame(animate)
        }
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [animationPercent])


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
        const currentTime = e.target.currentTime
        const duration = e.target.duration
       
        setAnimationPercent((currentTime / duration) * 100)

        setSongInfo({
            ...songInfo,
            currentTime
        })
    }

    //Song ended handler
    const songEndHandler = () => {
        skipHandler(1)
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
                <div 
                    style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} 
                    className='track'>
                    <input 
                        type='range'
                        min={0} 
                        max={songInfo.duration}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    />
                    <div style={styleTransform} className='animate-track'></div>
                </div>
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
                ref={audioRef} 
                src={currentSong.audio} 
                onLoadedMetadata={timeLoadHandler}
                onLoadedData={autoPlayHandler}
                onTimeUpdate={timeUpdateHandler}
                onEnded={songEndHandler}
            />
        </div>
     );
}
 
export default Player;