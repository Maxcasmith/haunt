import { useState } from "react"
import { Button } from "./Button"

export function Votes({ upvotes, myVote, onVote }) {
    
    const [votes, setVotes] = useState(upvotes || 0);
    const [selected, setSelected] = useState(myVote || 0);

    const upVote = () => handleVote(selected == 1 ? 0 : 1);
    const downVote = () => handleVote(selected == -1 ? 0 : -1);

    const handleVote = (castVote) => {
        setSelected(castVote);

        if (myVote == 1 && castVote < 1) setVotes(upvotes - 1);
        else if (myVote < 1 && castVote == 1) setVotes(upvotes + 1);
        else setVotes(upvotes);

        onVote(castVote);
    }

    return <div className="votes__wrapper">
        <Button color={ selected == 1 ? "red" : "none"} onClick={upVote}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1344_370)">
                    <path d="M3.95833 17.4167H0V7.91667H3.95833V17.4167ZM17.9035 10.7572C17.2251 10.6661 17.446 10.1761 17.9281 10.0273C18.3405 9.90058 19 9.63142 19 8.83183C19 8.29983 18.6042 7.59525 17.2021 7.65225C16.23 7.69183 14.2999 7.4955 13.2604 6.95163C13.9777 4.05729 13.8051 0 11.9241 0C10.6622 0 10.4231 1.43054 10.0439 2.74629C9.07725 6.10454 7.42188 7.50975 5.54167 8.19692V16.8087C9.01075 17.3636 10.5648 19 13.8581 19C16.3899 19 17.6993 17.6265 17.6993 16.8894C17.6993 16.6242 17.484 16.4358 16.9393 16.3938C16.2973 16.3448 16.3582 15.751 16.9638 15.6394C17.9677 15.4541 18.4094 14.9158 18.4094 14.4178C18.4094 13.999 18.0959 13.6088 17.5402 13.4829C16.8775 13.3333 17.0145 12.8836 17.5647 12.84C18.4617 12.7688 18.901 12.2352 18.901 11.7238C18.901 11.2765 18.5654 10.8458 17.9035 10.7572Z" fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_1344_370">
                        <rect width="20" height="20" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            {votes}
        </Button>
        <Button color={ selected == -1 ? "red" : "none"} onClick={downVote}>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3002_262)">
                    <path d="M4.58333 12.8333H0V1.83333H4.58333V12.8333ZM21.8854 8.42508C21.8854 7.83292 21.3767 7.21508 20.3381 7.13258C19.701 7.08217 19.5424 6.5615 20.3097 6.38825C20.9523 6.2425 21.3162 5.79058 21.3162 5.30567C21.3162 4.72908 20.8037 4.10575 19.6423 3.89125C18.9402 3.762 18.8705 3.0745 19.6139 3.01767C20.2446 2.96908 20.4939 2.75092 20.4939 2.44383C20.493 1.59042 18.9777 0 16.0462 0C12.2329 0 10.4335 1.89475 6.41667 2.53733V12.5088C8.59375 13.3054 10.5105 14.9325 11.6307 18.821C12.0688 20.3436 12.3466 22 13.8068 22C15.9839 22 16.1847 17.3021 15.3542 13.9508C16.5568 13.3201 18.7926 13.0927 19.9183 13.1395C21.5417 13.2055 22 12.3897 22 11.7737C22 10.8469 21.2364 10.5362 20.7588 10.3895C20.2006 10.2172 19.9439 9.64975 20.7304 9.54433C21.4968 9.44167 21.8854 8.943 21.8854 8.42508V8.42508Z" fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_3002_262">
                        <rect width="22" height="22" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </Button>
    </div>
}
