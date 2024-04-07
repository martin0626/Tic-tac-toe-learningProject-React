export default function Log({turns}){
    
    return <ol id='log'>
        {turns.map(t=>{
            return <li key={`${t.square.row}${t.square.col}`}>
                {t.player} selected {t.square.row}, {t.square.col}
            </li>
        })}
    </ol>
    
}