import BasicLayout from "../../layouts/BasicLayout";
import Sidebar from "../../components/common/Sidebar";

const ListPage = () => {

    return (
        <BasicLayout>
            <Sidebar pageType="matching" />
            <div className="contents">
                콘텐츠 부분
            </div>
        </BasicLayout>
    );
}

export default ListPage;