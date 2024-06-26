import BasicLayout from "../../layouts/BasicLayout";
import Sidebar from "../../components/common/Sidebar";

const EventPage = () => {

    return (
        <BasicLayout>
            <Sidebar pageType="cs" />
            <div className="contents">
                이벤트 부분
            </div>
        </BasicLayout>
    );
}

export default EventPage;