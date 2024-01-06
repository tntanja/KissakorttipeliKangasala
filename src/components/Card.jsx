import '../App.css';

export default function Card({ card }){
    if (!card) return <div className='card' />;
    
    return (
        <div className="card">
            <img className="kortin-kuva" src={card.image} />
            <ul className="kortin-lista">
                {card.ominaisuudet.map((ominaisuus, index) => (
                <li className="kortin-lista-item" key={index}>
                    <span>{ominaisuus.name}</span>
                    <span>{ominaisuus.value}</span>
                </li>
                ))}
            </ul>
        </div>
    );
}