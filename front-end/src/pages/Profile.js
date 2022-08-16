import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"
import { Carousel } from "../components/Carousel";
import { Button } from "../components/Button";
import { Votes } from "../components/Votes";
import {debounce} from "../utils";
import {findUserById, voteUser} from "../Api";

export function Profile() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const handleGetData = async () => {
        try {
            const d = await findUserById(id);
            setData(d);
        }
        catch (err) {
            navigate("/map");
        }
    }

    const handleVote = debounce(async (vote) => await voteUser(id, vote));

    useEffect(() => {
        handleGetData();
    }, [id]);

    const render = data ? <div className="location__page__wrapper">
        <div className="page__carousel__wrapper">
            <Carousel images={data?.images?.media || []} />
        </div>
        <div className="page__body__wrapper">
            <div className="page__body__toolbar__wrapper">
                <Button color="dark" onClick={() => navigate(-1)}>
                    <svg width="60" height="16" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.292896 7.29289C-0.0976257 7.68342 -0.0976257 8.31658 0.292896 8.70711L6.65686 15.0711C7.04738 15.4616 7.68055 15.4616 8.07107 15.0711C8.4616 14.6805 8.4616 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.4616 1.95262 8.4616 1.31946 8.07107 0.928932C7.68055 0.538408 7.04738 0.538408 6.65686 0.928932L0.292896 7.29289ZM60 7L1 7V9L60 9V7Z" fill="white"/>
                    </svg>
                    Back
                </Button>
                <Button color={editMode ? "red" : "dark"} onClick={() => setEditMode(!editMode)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z"/>
                    </svg>
                    {editMode ? 'Confirm' : 'Edit'}
                </Button>
            </div>
            <div className="page__title__toolbar">
                <h1 className="page__title">{data.handle}</h1>
                <div className="page__title__toolbar__votes" >
                    <Votes 
                        upvotes={data.upvotes}
                        myVote={data.myVote || 0}
                        onVote={handleVote}
                    />
                </div>
            </div>
            <div className="location__page__story__wrapper">
                <h3 className="location__page__story__title">Bio</h3>
                <p className="location__page__story__body">{data?.bio}</p>
            </div>
        </div>
    </div> : null;

    return render;
}
