import {managerExtraRoute, managerRoute} from '../../../routes/ConstRoute';
import { CollapseIconButton, collapseIcon, expandIcon, WrapperSideBar } from '../../../style/styled';
import { FC } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

interface Props {
  menuCollapse: any;
  setMenuCollapse: any;
}


const Sidebar: FC<Props> = ({ menuCollapse, setMenuCollapse }) => {
  return (
      <WrapperSideBar className="large-screen" style={{ width: !menuCollapse ? '290px' : '100px'}}>
        <CollapseIconButton className={`${menuCollapse ? 'expand' : 'collapse'}`}>
          <h1>NGOCTU COMPUTER</h1>
          <img src={menuCollapse ? expandIcon : collapseIcon} alt="" onClick={() => setMenuCollapse()} />
        </CollapseIconButton>

        <ProSidebar collapsed={menuCollapse}>
          <SidebarContent
              style={{
                marginTop: '20px',
              }}
          >
              { managerRoute.map((item) =>
                !item.subRoute.length ? (
                    <Menu iconShape="square">
                      <MenuItem
                          icon={item.icon}
                          style={{
                            font: 'normal normal normal 16px Lato',
                          }}
                      >
                        {item.title}
                      </MenuItem>
                    </Menu>
                ) : (
                    <Menu>
                      <SubMenu
                          suffix={<span className="badge yellow"></span>}
                          title={item.title}
                          icon={item.icon}
                          style={{
                            font: 'normal normal normal 16px Lato',
                            marginBottom: 10
                          }}
                      >
                        {item.subRoute?.map((item) => (
                            <MenuItem
                                key={item.path}
                                style={{
                                  font: 'normal normal normal 16px Lato',
                                }}
                            >
                              {item.title}
                            </MenuItem>
                        ))}
                      </SubMenu>
                    </Menu>
                )
            )}
            {/* </Menu> */}
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
                {managerExtraRoute.map((item) => (
                  <MenuItem
                      key={item.path}
                      icon={item.icon}
                      style={{
                        font: 'normal normal normal 16px Lato',
                        marginTop: 10
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

