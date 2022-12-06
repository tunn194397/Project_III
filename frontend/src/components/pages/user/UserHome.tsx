import UserNavbar from "../../organisms/user/Navbar";
import UserMainNavbar from "../../organisms/user/MainNavbar";
import UserMainPage from "../../organisms/user/UserMainPage";

export default function UserHome() {
    return (
        <div className='top-0 flex-row '>
            <div>
                <img src={"https://cdn-vn.pushdy.com/_uploads/phongvu_live_teko/2894028724594fb39900a2b1a4d1bfa1.png"}/>
            </div>
            <UserNavbar/>
            <UserMainNavbar/>
            <UserMainPage></UserMainPage>
        </div>
    )
}
