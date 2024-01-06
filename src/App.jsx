import './App.css';
import Card from './components/Card';

import { useState } from 'react';
import PlayButton from './components/PlayButton';


const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const kortti = (index) => ({
    id: crypto.randomUUID(),
    image: 'http://placekitten.com/120/100?image=' + index,
    ominaisuudet: [
        {name: 'cuteness', value: getRandomValue(3, 20)},
        {name: 'loving', value: getRandomValue(1, 200)},
        {name: 'speed', value: getRandomValue(5, 40)},
    ],
});

// korttipakka
const korttipakka = Array(16).fill(null).map( (_,index) => kortti(index) );
console.log(korttipakka);

// etsitään korttipakan puoliväli
const puolivali = Math.ceil(korttipakka.length / 2);

// jaetaan kortit pelaajalle ja vastustajalle
function jaaKortit() {
    shuffle(korttipakka);
    return {
        player: korttipakka.slice(0, puolivali),
        opponent: korttipakka.slice(puolivali)
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j] = array[j], array[i]];
    }
    return array;
}

export default function App(){
    
    const [result, setResult] = useState('');
    const [kortit, setCards] = useState(jaaKortit);
    const [gameState, setGameState] = useState('play');

    // const playerCard = kortti[0];
    // const opponentCard = kortti[0];
    
    if (gameState === 'play' && (!kortit.player.length || !kortit.opponent.length)) {
        setGameState('gameover');
    }

    function compareCards() {
        //console.log('Button clicked!');

        // hakee 1. statuksen molemmilta korteilta
        const playerStatus = kortit.player[0].ominaisuudet[0];
        const opponentStatus = kortit.opponent[0].ominaisuudet[0];

        // luodaan tulokselle oma muuttuja
        // let result = '';

        // tulosten vertaaminen
        if (playerStatus.value === opponentStatus.value) setResult('tasapeli');
        else if (playerStatus.value > opponentStatus.value) setResult('voitto');
        else setResult('häviö');

        // tulostetaan tulos consoleen
        console.log(result);
        setGameState('result')
    }

    function nextRound() {
        setCards (korttipakka => {
            const pelatutKortit = [{...korttipakka.player[0]}, {...korttipakka.opponent[0]}];

            const player = korttipakka.player.slice(1);
            const opponent = korttipakka.opponent.slice(1);

            if (result == 'tasapeli') {
                return {
                    player,
                    opponent
                };
            }

            if (result === 'voitto') {
                return {
                    player: [...player, ...pelatutKortit],
                    opponent
                };
            }

            if (result === 'häviö') {
                return {
                    player,
                    opponent: [...opponent, ...pelatutKortit]
                };
            }

            return korttipakka;
        });

        setGameState('play');
        setResult('');
    }
    
    return (
        <>
            <h1> Kissakorttipeli </h1>
            <div className='pelialue'>

                <div>
                <p> Pelaajan kortit </p>
                    <ul className='korttirivi'>
                    {kortit.player.map((kortti, index) =>
                        <li className='korttirivi-player' key={kortti.id}> 
                            <Card card = {index === 0 ? kortti : null}/>
                        </li>
                    )}
                    </ul>
                </div>

                <div className='button-area'>
                    <p> { result || 'Press the button'} </p>

                    {gameState === 'gameover' && (
                        <div>
                            <h3> GAME OVER! </h3>
                        </div>
                    )}

                    {gameState === 'play' ? (
                        <PlayButton text={'Play'} handleClick={compareCards} />
                    ) : (
                        <PlayButton text={'Next'} handleClick={nextRound} />
                    )}

                </div>
                
                
                
                <div>
                    <p> Vastustajan kortit </p>
                    <ul className='korttirivi opponent'>
                    {kortit.opponent.map((kortti, index) =>
                        <li className='korttirivi-opponent' key={kortti.id}> 
                            <Card card={index === 0 ? kortti : null}/>
                        </li>
                    )}
                    </ul>
                </div>

            </div>
        </>
    );
}