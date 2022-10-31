import React from "react";
import './About.css'

function About () {


    return(
        <div id='about-exterior-container'>
            <div id='about-interior-container'>
                <h1>
                    Strong Coders:
                </h1>
                <div id='developer-wrapper'>
                    <div id='individual-developer'>
                        <div id='developer-name'>
                            Connor Lam
                        </div>
                        <div id='profile-picture-wrapper'>
                            <img id='developer-profile-picture' src='https://avatars.githubusercontent.com/u/104233383?v=4' />
                        </div>
                        {/* change font color? */}
                        <div id="bio">
                            Hi I'm Connor and welcome to Y-eat! This project was created by my co-developers and I, and was intented to be a clone of Yelp. Besides my love for coding, I'm an avid lover of badminton and also enjoy playing video games with friends. If you would like to connect with me or checkout my other projects please check the links below.
                        </div>
                        <div>
                            <div id="connect">Connect:</div>
                            <div id='developer-socials'>
                                <a href="https://github.com/ConnorLam" target="_blank" rel="noreferrer noopener" id='github-logo'><i className="fa-brands fa-github fa-4x" /></a>
                                <a href='https://www.linkedin.com/in/connor-lam-a6545a23b/' target="_blank" rel="noreferrer noopener" id='linkedin-logo'><i className="fa-brands fa-linkedin fa-4x" /></a>
                                <a href='https://angel.co/u/connor-lam' target="_blank" rel="noreferrer noopener" id='angelList-logo'><i className="fa-brands fa-angellist fa-4x" /></a>
                            </div>
                        </div>
                        <div id="projects">
                            <div>Other Projects:</div>
                            <div id='projects-wrapper'>
                                <div id='individual-project' ><a href='https://dropshotz.herokuapp.com/' target="_blank" rel="noreferrer noopener">DropShotz</a></div>
                                <div id='individual-project' ><a href='https://airbnb-clone-connor-lam.herokuapp.com/' target="_blank" rel="noreferrer noopener">FakeBnb</a></div>
                            </div>
                        </div>
                    </div>
                    <div id='individual-developer'>
                        <div id='developer-name'>
                            Edward Felipe III
                        </div>
                        <div id='profile-picture-wrapper'>
                            <img id='developer-profile-picture' src='https://media-exp1.licdn.com/dms/image/C5622AQE2ONk8C5o9hQ/feedshare-shrink_800/0/1666375144748?e=1669852800&v=beta&t=-Mh7n8h-ToxY0SMZx1azxcVL7aC7qdcs3IU56x4Pm9s' />
                        </div>
                        <div id="bio">
                            Hello there! My nane is Edward, and my friends call me Ed. I hope you enjoyed checking out our Yelp clone as much as I enjoyed working with my awesome team! Outside of coding and playing video games in front of my computer, I like to spend time at the beaches and occassionaly hike some of the trails here in Hawaii. Click the links below to check out my projects and/or connect!
                        </div>
                        <div>
                            <div id="connect">Connect:</div>
                            <div id='developer-socials'>
                                <a href='https://github.com/E-F-III' target="_blank" rel="noreferrer noopener" id='github-logo'><i className="fa-brands fa-github fa-4x" /></a>
                                <a href='https://www.linkedin.com/in/efiii/' target="_blank" rel="noreferrer noopener" id='linkedin-logo'><i className="fa-brands fa-linkedin fa-4x" /></a>
                                <a href='https://angel.co/u/e-f-iii' target="_blank" rel="noreferrer noopener" id='angelList-logo'><i className="fa-brands fa-angellist fa-4x" /></a>
                            </div>
                        </div>
                        <div id="projects">
                            <div>Other Projects:</div>
                            <div id='projects-wrapper'>
                                <div id='individual-project' ><a href='https://leitner-scape.herokuapp.com/' target="_blank" rel="noreferrer noopener">Leitner-scape</a></div>
                                <div id='individual-project' ><a href='https://hike-up.herokuapp.com/' target="_blank" rel="noreferrer noopener">Hike-Up</a></div>
                            </div>
                        </div>
                    </div>
                    <div id='individual-developer'>
                        <div id='developer-name'>
                            Tyler Jean
                        </div>
                        <div id='profile-picture-wrapper'>
                            <img id='developer-profile-picture' src='https://avatars.githubusercontent.com/u/104518737?s=400&u=62e1ffcb888bfa1a9ed7a13e82058c2718962c73&v=4' />
                        </div>
                        <div id="bio">
                        A resident of New Hampshire, Tyler Jean grew up spending much of his time outdoors – Hiking, kayaking, rock-climbing, and long-distance running; all still passions of his to this day. In his adult life, he has worked in leadership positions for a major US airline in several locations across the country. He has a passion for problem-solving, strategy games, and philosophy. 
                        </div>
                        <div>
                            <div id="connect">Connect:</div>
                            <div id='developer-socials'>
                                <a href="https://github.com/tylernaej" target="_blank" rel="noreferrer noopener" id='github-logo'><i className="fa-brands fa-github fa-4x" /></a>
                                <a href='https://www.linkedin.com/in/tyler-jean-1a934ba8/' target="_blank" rel="noreferrer noopener" id='linkedin-logo'><i className="fa-brands fa-linkedin fa-4x" /></a>
                                <a href='https://angel.co/u/tyler-jean' target="_blank" rel="noreferrer noopener" id='angelList-logo'><i className="fa-brands fa-angellist fa-4x" /></a>
                            </div>
                        </div>
                        <div id="projects">
                            <div>Other Projects:</div>
                            <div id='projects-wrapper'>
                                <div id='individual-project' ><a href='https://trello-tyler.herokuapp.com/home' target="_blank" rel="noreferrer noopener">Stratify</a></div>
                                <div id='individual-project' ><a href='https://airbnb-tyler.herokuapp.com/' target="_blank" rel="noreferrer noopener">Airbnb</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
