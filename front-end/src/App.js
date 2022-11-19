import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [playlist, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const [playlistName, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [numOfSongs, setNumOfSongs] = useState("");
  const [runtime, setRuntime] = useState("");
  const [link, setLink] = useState("");
  const [songName, setSongName] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");

  const fetchPlaylists = async() => {
    try {      
      const response = await axios.get("/api/playlist");
      setPlaylists(response.data);
    } catch(error) {
      setError("error retrieving playlists: " + error);
    }
  }
  
  const fetchSongs = async() => {
    try {      
      const response = await axios.get("/api/songs");
      setSongs(response.data);
    } catch(error) {
      setError("error retrieving songs: " + error);
    }
  }
  
  const createPlaylist = async() => {
    try {
      await axios.post("/api/playlist", {playlistName: playlistName, genre: genre, numOfSongs: numOfSongs, runtime: runtime, link: link});
    } catch(error) {
      setError("error adding a product: " + error);
    }
  }
  
  const createSong = async() => {
    try {
      await axios.post("/api/songs", {songName: songName, songGenre: songGenre, artist: artist, duration: duration});
    } catch(error) {
      setError("error adding a song: " + error);
    }
  }
  
  const deletePlaylist = async(item) => {
    try {
      await axios.delete("/api/playlist/" + item.id);
      fetchPlaylists();
    } catch(error) {
      setError("error deleting playlist: " + error);
    }
  }
  
  const deleteSong = async(item) => {
    try {
      await axios.delete("/api/songs/" + item.id);
      fetchSongs();
    } catch(error) {
      setError("error deleting song: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchPlaylists();
  },[]);

  const addPlaylist = async(e) => {
    e.preventDefault();
    await createPlaylist();
    fetchPlaylists();
    setName("");
    setGenre("");
    setNumOfSongs("");
    setRuntime("");
    setLink("");
  }
  
  const addSong = async(e) => {
    e.preventDefault();
    await createSong();
    fetchSongs();
    setSongName("");
    setSongGenre("");
    setArtist("");
    setDuration("");
  }

  // render results
  return (
    <div className="App">
      {error}
      <h1>Create a Playlist</h1>
      <form onSubmit={addPlaylist}>
        <div>
          <p>Name: <input type="text" value={playlistName} onChange={e => setName(e.target.value)} /></p>
        </div>
        <div>
          <p>Genre: <input type = "text" value={genre} onChange={e=>setGenre(e.target.value)}/></p>
        </div>
        <div>
          <p>Number of Songs: <input type = "text" value={numOfSongs} onChange={e=>setNumOfSongs(e.target.value)}/></p>
        </div>
        <div>
          <p>Run Time: <input type = "text" value={runtime} onChange={e=>setRuntime(e.target.value)}/></p>
        </div>
        <div>
          <p>Link to Playlist: <input type = "text" value={link} onChange={e=>setLink(e.target.value)}/></p>
        </div>
        <input className = "submit" type="submit" value="Submit" />
      </form>
      <h1>Playlists</h1>
      {playlist.map( item => (
        <div key={item.id} className="playlist">
          <a href={item.link}><h2>{playlist.find(product => product.id == item.id).playlistName}</h2></a>
          <div className="info">
            <p><b>Genre:</b> {item.genre}</p>
            <p><b>Run Time:</b> {item.runtime}</p>
            <p><b>Songs:</b> {item.numOfSongs}</p>
          </div>
          <button className = "removeButton" onClick={e => deletePlaylist(item)}>Remove</button>
        </div>
      ))}  
      <h1>Add a Song</h1>
      <form onSubmit={addSong}>
        <div>
          <p>Name: <input type="text" value={songName} onChange={e => setSongName(e.target.value)} /></p>
        </div>
        <div>
          <p>Genre: <input type = "text" value={songGenre} onChange={e=>setSongGenre(e.target.value)}/></p>
        </div>
        <div>
          <p>Artist: <input type = "text" value={artist} onChange={e=>setArtist(e.target.value)}/></p>
        </div>
        <div>
          <p>Duration: <input type = "text" value={duration} onChange={e=>setDuration(e.target.value)}/></p>
        </div>
        <input className = "submit" type="submit" value="Submit" />
      </form>
      <h1>Songs</h1>
      {songs.map( item => (
        <div key={item.id} className="songs">
          <h2>{songs.find(product => product.id == item.id).songName}</h2>
          <div className="info">
            <p><b>Artist:</b> {item.artist}</p>
            <p><b>Genre:</b> {item.songGenre}</p>
            <p><b>Duration:</b> {item.duration}</p>
          </div>
          <button className = "removeButton" onClick={e => deleteSong(item)}>Remove</button>
        </div>
      ))} 
      <a href= "https://github.com/julianacsmith/Community_Playlist">Juliana's GitHub Link</a>
    </div>
  );
}

export default App;
