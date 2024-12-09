import React, { useRef, useEffect } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { usePlayerStore } from "../Hooks/playerStore";


const PlayerMusic = () => {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state)
    const audioRef = useRef();
    //const cancion = [{ songTitle = "Somebody That I Used To Know", artist = "Gotye, Kimbra", duration = "3:23", currentTime = "0:00" }]

    //Validar la cancion
    useEffect(() => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [isPlaying]);

    // Cambiar la canción actual
    useEffect(() => {
        if (currentMusic?.previewUrl) {
            audioRef.current.src = currentMusic.previewUrl; // Asigna el preview_url como fuente del audio
            if (isPlaying) {
                audioRef.current.play();
                audioRef.current.volume = 0.1;
            }
        }
    }, [currentMusic]);

    const handleClick = () => {

        setIsPlaying(!isPlaying)
    }


    return (
        <>
            <div className="flex flex-row justify-between w-full px-4 h-[15%] bg-white rounded-lg bg-opacity-10  items-center text-[#F3F3F1] ">
                {/* Botones de control */}
                <div className="flex items-center gap-4">
                    <button className="hover:bg-gray-800 rounded-full">
                        <SkipPreviousIcon />
                    </button>
                    <button
                        onClick={handleClick}
                        className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full"
                    >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-full">
                        <SkipNextIcon />
                    </button>
                </div>

                {/* Información de la canción */}
                <div className="items-center flex">
                    <>
                        <img
                            src={currentMusic?.images || "https://via.placeholder.com/50"}
                            alt={currentMusic?.title || "No song selected"}
                            className={`w-12 h-12 mr-4 rounded-full ${isPlaying ? "animate-spin" : ""}`}
                        />
                    </>

                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold">
                            {currentMusic?.title || "No song selected"}
                        </p>
                        <p className="text-sm text-gray-400">
                            {currentMusic?.artist || "Unknown artist"}
                        </p>
                    </div>

                    <div>
                        <audio ref={audioRef} />
                    </div>
                </div>

                <div>

                </div>
            </div>
        </>

    )
}

export default PlayerMusic;



