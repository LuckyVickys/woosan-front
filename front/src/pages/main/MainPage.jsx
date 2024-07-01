import '../../assets/styles/App.scss';

import BasicLayout from "../../layouts/BasicLayout";

const MainPage = () => {
    return (
        <BasicLayout>
           <div className="main-contents">
                <div className="banner">
                    <div className="main-banner"></div>
                    <div className="popular-post">
                    </div>
                </div>
                 <div className="main-info">
                    <div className="info1"></div>
                    <div className="info2"></div>
                    <div className="info3"></div>
                    <div className="info4"></div>
                </div>
                {/*<div className="main-board-matching">
                    <div className="main-board"></div>
                    <div className="main-matching"></div>
                </div> */}
            </div>
        </BasicLayout>
    );
}

export default MainPage;