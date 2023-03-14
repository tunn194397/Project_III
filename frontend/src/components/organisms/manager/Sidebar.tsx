import {managerExtraRoute, managerRoute} from '../../../routes/ConstRoute';
import { CollapseIconButton, collapseIcon, expandIcon, WrapperSideBar } from '../../../style/styled';
import {FC, useContext} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";

interface Props {
  menuCollapse: any;
  setMenuCollapse: any;
}


const Sidebar: FC<Props> = ({ menuCollapse, setMenuCollapse }) => {
  const navigate = useNavigate()
  const { permission } = useContext(AuthContext);
  const arrayRoute = managerRoute;
    arrayRoute.map((route : any) => {
      if (route.permission) route.able = permission?.includes(route.permission)? 1: 0;
      else {
          let count = 0;
          route.subRoute.map((subRoute: any) => {
              if (permission?.includes(subRoute.permission)) {
                  subRoute.able = 1;
                  count++;
              }
          })
          route.able = (count > 0) ? 1: 0
      }
  })
  return (
      <WrapperSideBar style={{ width: !menuCollapse ? '200px' : '100px'}}>
        <ProSidebar collapsed={menuCollapse}>
          <SidebarContent
              style={{
                marginTop: '5px',
              }}
          >
              { arrayRoute.map((item, index) =>
                  (!item.subRoute.length) ? (
                      (item.able) ?
                        <Menu iconShape="square">
                            <MenuItem
                                active={item.path === window.location.pathname || (index === 0 && window.location.pathname === '/')}
                                key = {item.path}
                                icon={item.icon}
                                onClick = {() => navigate(item.path || '')}
                                style={{
                                    font: 'normal normal normal 12px'
                                }}
                            >
                                {item.title}
                            </MenuItem>
                        </Menu> : ''
                    )   : (
                      (item.able) ?
                        <Menu>
                          <SubMenu
                              suffix={<span className="badge yellow"></span>}
                              title={item.title}
                              icon={item.icon}
                              style={{
                                font: 'normal normal normal 12px ',
                                marginBottom: 0
                              }}
                          >
                            {item.subRoute?.map((e: any) => (
                                (e.able && permission.includes(e.permission)) ?
                                    <MenuItem
                                        active={e.path === window.location.pathname}
                                        key={e.path}
                                        icon={e.icon}
                                        onClick = {() => navigate(e.path || '')}
                                        style={{
                                          font: 'normal normal normal 12px ',
                                        }}
                                    >
                                      {e.title}
                                    </MenuItem> : ''
                            ))}
                          </SubMenu>
                        </Menu>: ''
                )
            )}
            {/* </Menu> */}
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
                {managerExtraRoute.map((item) => (
                  <MenuItem
                      active={item.path === window.location.pathname}
                      onClick = {() => navigate(item.path || '')}
                      key={item.path}
                      icon={item.icon}
                      style={{
                        font: 'normal normal normal 12px '
                      }}
                  >
                    {item.title}
                  </MenuItem>
              ))}
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </WrapperSideBar>
  );
};

export default Sidebar;

