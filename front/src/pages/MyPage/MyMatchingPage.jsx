import BasicLayout from "../../layouts/BasicLayout";
import Sidebar from "../../components/common/Sidebar";

const UpdateInfoPage = () => {

    return (
        <BasicLayout>
            <Sidebar pageType="myPage" />
            <div className="contents">
                콘텐츠 부분
            </div>
        </BasicLayout>
    );
}

export default UpdateInfoPage;