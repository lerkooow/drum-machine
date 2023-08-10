import './App.css';
import { useState } from "react";


function App() {
  const musicButton = [
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
      letter: "Q",
      soundsName1: "Heater 1",
      soundsName2: "Chord 1",

    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
      letter: "W",
      soundsName1: "Heater 2",
      soundsName2: "Chord 2",

    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
      letter: "E",
      soundsName1: "Heater 3",
      soundsName2: "Chord 3",

    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
      letter: "A",
      soundsName1: "Heater 4",
      soundsName2: "Shaker",


    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
      letter: "S",
      soundsName1: "Clap",
      soundsName2: "Open HH",

    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
      letter: "D",
      soundsName1: "Open-HH",
      soundsName2: "Closed HH",

    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
      letter: "Z",
      soundsName1: "Kick-n'-Hat",
      soundsName2: "Punchy Kick",

    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
      letter: "X",
      soundsName1: "Kick",
      soundsName2: "Side Stick",

    },
    {
      url1: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      url2: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
      letter: "C",
      soundsName1: "Closed-HH",
      soundsName2: "Snare",
    }
  ];

  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(true);
  const [currentLetter, setCurrentLetter] = useState("");
  const [activeSound, setActiveSound] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [volumeDisplay, setVolumeDisplay] = useState(true);
  const [volumeDisplayTimeout, setVolumeDisplayTimeout] = useState(null);


  const playSound = (url) => {
    if (power === false && activeSound !== url) {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.play();
      setActiveSound(url);
      setVolumeDisplay(true);
      clearTimeout(volumeDisplayTimeout);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    setVolumeDisplayTimeout(
      setTimeout(() => {
        setVolumeDisplay(true);
      }, 3000)
    );
  };

  const foundMusic = musicButton.find(music => music.letter === currentLetter);


  return (
    <div className="App">
      <div className="inner-container" id="drum-machine">
        <div className="pad-bank">
          {musicButton.map((music) => (
            <div
              key={music.letter}
              className={power ? "drum-pad" : "active"}
              id={music.letter}
              onClick={() => {
                if (bank) {
                  setCurrentLetter(music.letter);
                  playSound(music.url1)
                  setActiveSound(null);

                } else {
                  setCurrentLetter(music.letter);
                  playSound(music.url2);
                  setActiveSound(null);
                }
              }}
            >
              {music.letter}
            </div>
          ))}
        </div>
        <div className="logo">
          <div className="inner-logo ">
            <span>FCC</span>
          </div>
          <i className="inner-logo fa fa-free-code-camp"></i>
        </div>
        <div className="controls-container">
          <div className="control">
            <p><span>Power</span></p>
            <div className="select">
              <div className={power ? 'inner' : 'switch'} value={power} onClick={() => setPower((prevPower) => !prevPower)}></div>
            </div>
          </div>

          {volumeDisplay ?
            <p id="display">
              {power
                ? ""
                : bank
                  ? foundMusic?.soundsName1 || "Header Kit"
                  : foundMusic?.soundsName2 || "Smooth Piano Kit"}
            </p> :
            <p id="display">Volume: {Number.parseFloat(volume * 100).toFixed(0)}</p>
          }
          <div className="volume-slider">
            {power ?
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                disabled>
              </input> :
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                onClick={() => setVolumeDisplay(false)}>
              </input>}
          </div>
          <div className="control">
            <p><span>Bank</span></p>
            <div className="select">
              <div className={bank ? 'inner' : 'switch'}
                value={bank}
                onClick={() => setBank(prevBank => (power ? prevBank : !prevBank))}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
export default App;
