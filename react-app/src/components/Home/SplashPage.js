import React, { useEffect, useState, useRef, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from "react-router-dom";
import { getBizThunk } from '../../store/business'
import BizCard from "../Business/BusinessList/businessCard";

import splashImage1 from "../../assets/splash-image1.jpg"
import splashImage2 from "../../assets/splash-image2.jpg"
import splashImage3 from "../../assets/splash-image3.jpg"
import redLogo from "../../assets/YEat-text_red_medium.png"

import './SplashPage.css'

const images = [splashImage1, splashImage2, splashImage3]

function SplashPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const businesses = useSelector(state => state.businesses)

    const [splashNum, setSplashNum] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getBizThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        const colorInterval = setInterval(() => {
            setSplashNum((prevNum) => ++prevNum % images.length);
        }, 5000);

        return () => {
            clearInterval(colorInterval);
        };
    }, []);

    return isLoaded && (
        <div>
            <div id="splash-main" className="splash-main"
                style={
                    {
                        backgroundImage: `url(${images[splashNum]})`,
                    }
                }>
                <div className="w30" style={{ color: "white" }}>
                    <div>

                        <div>
                            <h1 id="splash-header">Welcome to <img src={redLogo} /></h1>
                        </div>

                        <div >
                            <button onClick={() => history.push('/businesses')} id='this-id-doesnt-exist'>See all businesses</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="splash-footer" className="flex-row-center">
                <div className="flex-row-justify-between w70">
                    <div>
                        <h5>
                            About
                        </h5>
                            <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej/YEat/" target="_blank" rel="noreferrer noopener">GitHub repository</a></li>
                            <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej/YEat/wiki" target="_blank" rel="noreferrer noopener">Project wiki</a></li>
                    </div>
                    <div>
                        <h5>
                            Dev: Connor Lam
                        </h5>
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej/YEat/" target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/ConnorLam" target="_blank" rel="noreferrer noopener">GitHub</a></li>
                    </div>
                    <div>
                        <h5>
                            Dev: Edward Felipe III
                        </h5>
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://www.linkedin.com/in/efiii/" target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/E-F-III" target="_blank" rel="noreferrer noopener">GitHub</a></li>
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://www.instagram.com/edwardfelipeiii/" target="_blank" rel="noreferrer noopener">Instagram</a></li>
                    </div>
                    <div>
                        <h5>
                            Dev: Tyler Jean
                        </h5>
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej/YEat/" target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej" target="_blank" rel="noreferrer noopener">GitHub</a></li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage
