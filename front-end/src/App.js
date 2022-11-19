import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [playlist, setPlaylists] = useState([]);
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");
  const [playlistName, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [numOfSongs, setNumOfSongs] = useState();
  const [runtime, setRuntime] = useState("");
  const [link, setLink] = useState("");

  const fetchPlaylists = async() => {
    try {      
      const response = await axios.get("/api/playlist");
      setPlaylists(response.data);
    } catch(error) {
      setError("error retrieving playlists: " + error);
    }
  }
  
  const fetchPeople = async() => {
    try {      
      const response = await axios.get("/api/people");
      setPeople(response.data);
    } catch(error) {
      setError("error retrieving people: " + error);
    }
  }
  
  const createPlaylist = async() => {
    try {
      await axios.post("/api/playlist", {playlistName: playlistName, genre: genre, numOfSongs: numOfSongs, runtime: runtime, link: link});
    } catch(error) {
      setError("error adding a product: " + error);
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

  // fetch ticket data
  useEffect(() => {
    fetchPlaylists();
  },[]);

  const addProduct = async(e) => {
    e.preventDefault();
    await createPlaylist();
    fetchPlaylists();
    setName("");
    setGenre("");
    setNumOfSongs();
    setRuntime("");
    setLink("");
  }

  // render results
  return (
    <div className="App">
      {error}
      <h1>Playlists</h1>
      {playlist.map( item => (
        <div key={item.id} className="playlist">
          <a href={item.link}><h2>{playlist.find(product => product.id == item.id).playlistName}</h2></a>
          <div className="info">
            <p><b>Genre:</b> {item.genre}</p>
            <p><b>Run Time:</b> {item.runtime}</p>
            <p><b>Songs:</b> {item.numOfSongs}</p>
          </div>
          <button onClick={e => deletePlaylist(item)}>Remove</button>
        </div>
      ))}  
    </div>
  );
}

export default App;
