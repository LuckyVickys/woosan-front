import React from 'react';
import UpdatePassword from '../../components/myPage/UpdatePassword';
import UpdateInfo from '../../components/myPage/UpdateInfo';

const UpdateInfoPage = () => {

    return (
        <div className="contents">
            <UpdateInfo />
            <UpdatePassword />
        </div>
    );
}

export default UpdateInfoPage;