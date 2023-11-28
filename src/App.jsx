import './App.css';
import Card from './components/Card';

import { useState } from 'react';


const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const kortti = (index) => ({
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
    player: korttipakka.slice(0, puolivali);
    opponent: korttipakka.slice(puolivali)
}

export default function App(){
    
    const [result, setResult] = useState('');
    const [kortit, setCards] = useState(jaaKortit);

    // const playerCard = kortti[0];
    // const opponentCard = kortti[0];
    
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
    }
    
    return (
        <>
            <h1> Kissakorttipeli </h1>
            <div className='pelialue'>

                <div>
                    <p> Pelaajan kortit </p>
                    <Card card={kortit.player[0]}/>
                </div>

                <p> { result } </p>
                <button onClick={compareCards} type="button" className='playButton'> Vertaile </button>
                
                <div>
                    <p> Vastustajan kortit </p>
                    <Card card={kortit.opponent[0]}/>
                </div>

            </div>
        </>
    );
}