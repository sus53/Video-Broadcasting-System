import React from 'react'
import Polo from "/Polo - The Gentlemans' Sport.mp4"
import ImpossibleMoment from '/Impossible Moments in Sports.mp4'
import NBAMoments from '/NBA Epic Moments.mp4'
import EmotionalWinning from '/Emotional Winnings in Sports.mp4'
import FunnyMoments from '/Most Funny Moments in Sports.mp4'

import './suggestion.scss';

function Vsuggestion() {
    return (
        <div className='vertical-video-suggestion'>
            <h3 className='heading'>
                SUGGESTIONS
            </h3>
            <div className='item'>
                <div className='video'>
                    <video autoPlay loop muted src={Polo} width={"180 %"}></video>
                </div>
                <div className='video-info'>
                    <div>
                        Polo - The Gentlemen's Sport
                    </div>
                    <div>Polo</div>
                </div>
            </div>
            <div className='item'>
                <div className='video'>
                    <video autoPlay loop muted src={FootballDefence} width={"180 %"}></video>
                </div>
                <div className='video-info'>
                    <div>
                        Defence is an Art
                    </div>
                    <div>Football</div>
                </div>
            </div>
            <div className='item'>
                <div className='video'>
                    <video autoPlay loop muted src={ImpossibleMoment} width={"180 %"}></video>
                </div>
                <div className='video-info'>
                    <div>
                        Impossible Moments in Sports
                    </div>
                    <div>Mix</div>
                </div>
            </div>
            <div className='item'>
                <div className='video'>
                    <video autoPlay loop muted src={NBAMoments} width={"180 %"}></video>
                </div>
                <div className='video-info'>
                    <div>
                        NBA Epic Moments
                    </div>
                    <div>Basketball</div>
                </div>
            </div>
            <div className='item'>
                <div className='video'>
                    <video autoPlay loop muted src={EmotionalWinning} width={"180 %"}></video>
                </div>
                <div className='video-info'>
                    <div>
                        Emotional Winnings in Sports
                    </div>
                    <div>Mix</div>
                </div>
            </div>
            <div className='item'>
                <div className='video'>
                    <video autoPlay loop muted src={FunnyMoments} width={"180 %"}></video>
                </div>
                <div className='video-info'>
                    <div>
                        Most Funny Moments in Sports
                    </div>
                    <div>Mix</div>
                </div>
            </div>
        </div>
    )
}

export default Vsuggestion