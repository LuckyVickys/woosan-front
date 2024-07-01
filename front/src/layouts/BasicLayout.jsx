import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import Footer from "../components/common/Footer";

const BasicLayout = ({children}) => {
    return (
        <div className="wrapper">
            <Header />
            <Nav />
            <div className="area">{children}</div>
            <Footer />
        </div>
    );
}

export default BasicLayout;