import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { findLocationById, voteLocation } from "../Api";
import { Carousel } from "../components/Carousel";
import { Button } from "../components/Button";
import { Votes } from "../components/Votes";
import { SocialThread } from "../components/SocialThread";
import { Album } from "../components/Album";
import {debounce} from "../utils";

export function Location() {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [ data, setData ] = useState(null);
    const [ tab, setTab ] = useState("comment");
    const isVerified = data?.verified == 1;

    const handleGetData = async () => {
        try {
            const d = await findLocationById(id);
            setData(d);
        } catch (err) {
            navigate('/map');
        }
    }

    const handleDirections = () => window.open(`https://maps.google.com/?q=${data?.lat},${data?.lng}`, "_blank");

    const handleVote = debounce(async (vote) => await voteLocation(id, vote));

    useEffect(() => {
        handleGetData();
    }, [ id ]);

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
                <Button color="dark" onClick={handleDirections}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 15.189V0H8V9.629C6.365 11.199 5.007 13.087 4 15.189ZM12.709 5.5L13.75 8.125C7.875 10.688 4 17.125 4 24H8C8 18.781 11.438 13.25 15.333 12L16.417 14.625L20 7.844L12.709 5.5Z" fill="white"/>
                    </svg>
                    Directions
                </Button>
            </div>
            <div className="page__title__toolbar">
                <h1 className="page__title">
                    {data.name}
                    {
                        isVerified && <svg className="verified__tag" width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path color={"var(--bg-red)"} d="M10.5 1.75C8.41142 1.75 6.40838 2.57968 4.93153 4.05653C3.45468 5.53338 2.625 7.53642 2.625 9.625C2.625 12.2762 3.96375 14.7175 6.125 16.1612V19.25H7.875V16.625H9.625V19.25H11.375V16.625H13.125V19.25H14.875V16.1525C17.0363 14.7087 18.375 12.25 18.375 9.625C18.375 7.53642 17.5453 5.53338 16.0685 4.05653C14.5916 2.57968 12.5886 1.75 10.5 1.75ZM7 9.625C7.46413 9.625 7.90925 9.80937 8.23744 10.1376C8.56563 10.4658 8.75 10.9109 8.75 11.375C8.75 11.8391 8.56563 12.2842 8.23744 12.6124C7.90925 12.9406 7.46413 13.125 7 13.125C6.53587 13.125 6.09075 12.9406 5.76256 12.6124C5.43437 12.2842 5.25 11.8391 5.25 11.375C5.25 10.9109 5.43437 10.4658 5.76256 10.1376C6.09075 9.80937 6.53587 9.625 7 9.625ZM14 9.625C14.4641 9.625 14.9092 9.80937 15.2374 10.1376C15.5656 10.4658 15.75 10.9109 15.75 11.375C15.75 11.8391 15.5656 12.2842 15.2374 12.6124C14.9092 12.9406 14.4641 13.125 14 13.125C13.5359 13.125 13.0908 12.9406 12.7626 12.6124C12.4344 12.2842 12.25 11.8391 12.25 11.375C12.25 10.9109 12.4344 10.4658 12.7626 10.1376C13.0908 9.80937 13.5359 9.625 14 9.625ZM10.5 12.25L11.8125 14.875H9.1875L10.5 12.25Z" fill="white"/>
                        </svg>
                    }
                </h1>
                <div className="page__title__toolbar__votes" >
                    <Votes 
                        upvotes={data.upvotes}
                        myVote={data.myVote || 0}
                        onVote={handleVote}
                    />
                </div>
            </div>
            <div className="location__page__story__wrapper">
                <h3 className="location__page__story__title">Story</h3>
                <p className="location__page__story__body">{data?.desc}</p>
            </div>
            <div className="page__tabs__wrapper">
                <Button color={tab == "comment" ? "red" : "none"} onClick={() => setTab("comment")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M.054 23c.971-1.912 2.048-4.538 1.993-6.368-1.308-1.562-2.047-3.575-2.047-5.625 0-5.781 5.662-10.007 12-10.007 6.299 0 12 4.195 12 10.007 0 6.052-6.732 11.705-15.968 9.458-1.678 1.027-5.377 2.065-7.978 2.535z"/></svg>
                </Button>
                <Button color={tab == "album" ? "red" : "none"} onClick={() => setTab("album")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M1.859 6l-.489-2h21.256l-.491 2h-20.276zm1.581-4l-.439-2h17.994l-.439 2h-17.116zm20.56 16h-24l2 6h20l2-6zm-20.896-2l-.814-6h19.411l-.839 6h2.02l1.118-8h-24l1.085 8h2.019zm2.784-3.995c-.049-.555.419-1.005 1.043-1.005.625 0 1.155.449 1.185 1.004.03.555-.438 1.005-1.044 1.005-.605 0-1.136-.449-1.184-1.004zm7.575-.224l-1.824 2.68-1.813-1.312-2.826 2.851h10l-3.537-4.219z"/></svg>
                </Button>
            </div>
            <div className="">
                { tab == "comment" 
                    ? <SocialThread
                        id={id}
                        comments={[]}
                    /> 
                    : <Album 
                        id={id}
                        comments={data.comments || []}
                    />
                }
            </div>
        </div>
    </div> : null;

    return render;
}
