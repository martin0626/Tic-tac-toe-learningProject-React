import { useState } from "react"

export default function Player({name, symbol, isActive}){
    const [isUpdating, setIsUpdating] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    const [nameInput, setnameInput] = useState(playerName);


    const handleEditing = ()=>{
        setIsUpdating((value)=> !value)
    };

    const onChangeUserName = (e)=>{
        let currentInput = e.target.value;
        setnameInput(currentInput);
    };

    const changeNameHandler = ()=>{
        if(nameInput.length > 1){
            setPlayerName(nameInput);
        };

        setIsUpdating(false);
    };

    
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {isUpdating ? 
                    <input onChange={onChangeUserName} defaultValue={playerName}></input> 
                    : 
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            {isUpdating ?
                <button onClick={changeNameHandler}>Save</button> 
                :
                <button onClick={handleEditing}>Edit</button>
            }
            
          </li>
    )
}