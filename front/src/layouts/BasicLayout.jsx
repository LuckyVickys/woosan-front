import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import Footer from "../components/common/Footer";
import TopButton from "../components/common/TopButton";

const BasicLayout = ({children}) => {
    return (
        <div className="wrapper">
            <Header />
            <Nav />
            <div className="area">
                {children}
                <TopButton />
            </div>
            <Footer />
        </div>
    );
}

export default BasicLayout;