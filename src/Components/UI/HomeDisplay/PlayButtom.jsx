import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { usePlayerStore } from '../../../Hooks/playerStore.js';

export function PlayButtom({ song  }) {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state);

    const handleClick = () => {
        if (currentMusic?.id === song.id && isPlaying) {
            // Si ya está reproduciendo la misma canción, pausa
            setIsPlaying(false);
        } else {
            // Si no, cambia a esta canción y reproduce
            setCurrentMusic({
                id: song.id,
                title: song.name,
                artist: song.artist,
                previewUrl: song.previewUrl, // Propiedad para el audio
                images: song.imagen,
            });
            setIsPlaying(true);
        }
    };

    // Verificar si la canción actual es la que se está reproduciendo
    const isPlayingSong = currentMusic?.id === song.id && isPlaying;

    return (
        <button onClick={handleClick}>
            {isPlayingSong ? <PauseIcon /> : <PlayArrowIcon />}
           
        </button>
    )
}