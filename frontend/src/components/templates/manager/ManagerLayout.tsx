import { Outlet } from 'react-router-dom';
import Navbar from '../../organisms/manager/Navbar';
import Sidebar from '../../organisms/manager/Sidebar';
import {useState} from "react";
import styled from 'styled-components';


const Wrapper = styled.div`
  -webkit-font-smoothing: initial;
`;

const WrapperContent = styled.div`
  margin-top: 70px;
  .collapsem {
    margin-left: 290px;
    @media screen and (max-width: 767px) {
      margin-left: 0;
    }
  }
  .no-collapsem {
    margin-left: 50px;
    @media screen and (max-width: 767px) {
      margin-left: 0;
    }
  }
`;
const Content = styled.div<any>`
  background: #f2f3f7;
  min-height: calc(100vh - 85px);
  margin-top: 85px;
  padding: 0 40px 0 60px;

  @media screen and (max-width: 1600px) {
    padding: 0 40px 0 40px;
    ${(props) =>
    !props.collapsed &&
    `
        padding: 0 40px 0 60px;
    `}
  }

  @media screen and (max-width: 576px) {
    padding: 0 10px 0 10px;
    ${(props) =>
    !props.collapsed &&
    `
        padding: 0 10px 0 10px;
    `}
  }
`;


export default function ManagerLayout() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Wrapper style={{ fontFamily: 'Lato' }}>
            <div>
                <Navbar />
                <WrapperContent>
                    <Sidebar  menuCollapse = {collapsed} setMenuCollapse = {handleCollapsedChange} />
                    <Content><div>{}</div></Content>
                </WrapperContent>
                {/*<div className='h-full w-full fixed -z-50 top-0 left-0'></div>*/}
                {/*<div className='lg:ml-[300px] h-screen py-[60px]'>*/}
                {/*    <Outlet />*/}
                {/*</div>*/}
            </div>
        </Wrapper>
    );
}
