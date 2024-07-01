import '../../assets/styles/App.scss';
import figma from "../../assets/image/icon-figma.svg"; 
import github from "../../assets/image/icon-github.svg"; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="project">Woosan</div>
            <div className="right">LuckyVicky ⓒ 2 024. All rights reserved.</div>
            <div className="site">
                <img src={figma} alt="Figma" />
                <img src={github} alt="Github" />
            </div>
        </footer>
    )
}

export default Footer;