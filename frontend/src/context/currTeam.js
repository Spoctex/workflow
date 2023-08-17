import { useState } from "react";
import { createContext } from "react";

export const CurrTeamContext = createContext();

export const CurrTeamProvider = props => {
    const [currTeam, setCurrTeam] = useState(false);

    return (
        <CurrTeamContext.Provider
            value={{ currTeam, setCurrTeam }}
        >
            {props.children}
        </CurrTeamContext.Provider>
    )
}
