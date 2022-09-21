import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import './DropDownBizInfo.css'

function DropDownBizInfo({business}){

    const randomImages = [
        "nothing",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Frestaurant&psig=AOvVaw1FSKDoxgnTt8l0RCALuSxe&ust=1663886259791000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLih-sv5pvoCFQAAAAAdAAAAABAD",
        "https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg",
        "https://assets.bonappetit.com/photos/610aa6ddc50e2f9f7c42f7f8/master/pass/Savage-2019-top-50-busy-restaurant.jpg",
        "https://etimg.etb2bimg.com/photo/75161189.cms",
        "https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/newsletter/feature_-_Main_hall_1.jpg?15820431230",
        "https://pyxis.nymag.com/v1/imgs/85b/0e4/a33b482ebf609e34b71d94b599f914bf1a-22-golden-diner.rsocial.w1200.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/NYC_diner_Brooklyn.jpg/1200px-NYC_diner_Brooklyn.jpg",
        "https://cdn.downtoearth.org.in/library/large/2019-05-31/0.68487000_1559290735_70-20190615-dte-english.jpg",
        "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.michaelssantamonica.com%2F&psig=AOvVaw1iiVX0vhRee9wzTUHYzSSe&ust=1663886576688000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIj3j9b6pvoCFQAAAAAdAAAAABAD",
        "https://static01.nyt.com/images/2022/09/06/dining/06michelin1/merlin_208730661_8d43267c-3b6f-4cb7-a063-60cdf52cd4e5-videoSixteenByNine3000.jpg"
    ]

    console.log(randomImages[Math.floor(Math.random()*10)])

    return  (
        <div >
            <NavLink to={`/businesses/${business.id}/about`} id='result-navlink'>
                <div className="flex-row" id='individual-result'>
                    <div id='result-image'>
                        <img src={randomImages[Math.floor(Math.random()*10)]} id='random-image'/>
                    </div>
                    <div id='result-details'>
                        <div id='search-result-name'>
                            {business.name}
                        </div>
                        <div id='search-result-address'>
                            {business.address}
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default DropDownBizInfo