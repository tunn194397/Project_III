import expandIconPng from '../assets/icon/Expand.png';
import collapseIcon from '../assets/icon/collapse.svg';
import expandIcon from '../assets/icon/expand.svg';
import styled from 'styled-components';

export { collapseIcon, expandIcon, expandIconPng };

export const CollapseIconButton = styled.div`
  position: absolute;
  right: -25px;
  top: 20px;
  width: 42.8px;
  height: 42.8px;
  cursor: pointer;
  z-index: 10000;
  & img {
    width: 100%;
    height: 100%;
  }
  &.expand {
    right: -5px;
  }
`;

export const HeaderWrapper = styled.div`
  z-index: 1010;
  padding: 0px 0px 0px 0px;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-item: center;
  box-shadow: 0px 0px 10px #00000029;
  opacity: 1;
`;

export const UserHeaderWrapper = styled.div`
  z-index: 40;
  padding: 0px 0px 0px 0px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-item: center;
  box-shadow: 0px 0px 10px #00000029;
  opacity: 1;
`;

export const UserMainHeaderWrapper = styled.div`
  position: sticky;
  z-index: 30;
  padding: 0px 0px 0px 0px;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-item: center;
  box-shadow: 0px 0px 10px #00000029;
  opacity: 1;
`;

export const WrapperSideBar = styled.div`
  position: absolute;
  width: 290px;
  transition: width 0.2s linear;
  top: 72px;
  @media screen and (max-width: 767px) {
    top: 85px;
  }
  .pro-sidebar {
    height: calc(102vh - 87px);
    @media screen and (max-width: 767px) {
      height: 100vh;
    }
    width: 100%;
    min-width: 100%;

    .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item {
      background: #152237 0% 0% no-repeat padding-box;
    }

    &.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item > .popper-inner {
      background: transparent;
      & ul {
        background: #152237 0% 0% no-repeat padding-box;
        box-shadow: 0.5px 0.866px 2px 0px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        & li {
          margin-left: 10px;
          margin-right: 10px;
        }
        &::before {
          width: 0px;
        }
      }
    }

    .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item {
      position: relative;
      padding-left: 0 !important;
      margin-top: 10px;
      .pro-menu-item {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-left: 16px;
        font-size: 16px;
      }
    }
  }

  .pro-sidebar.collapsed {
    width: 80px !important;
    min-width: 80px !important;
  }

  .pro-menu {
    ul {
      margin: 0 10px !important;
    }

    .pro-inner-list-item ul {
      margin-right: 0;
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #fff;
        position: absolute;
        top: 0;
      }
    }
  }

  .closemenu {
    color: #000;
    position: absolute;
    right: 0;
    z-index: 9999;
    line-height: 20px;
    border-radius: 50%;
    font-weight: 500;
    font-size: 22px;
    top: 50%;
    transform: translateY(-50%);
    right: -30px;
    cursor: pointer;
  }

  .pro-sidebar-inner {
    background: #152237 0% 0% no-repeat padding-box;
    box-shadow: 0.5px 0.866px 2px 0px rgba(0, 0, 0, 0.15);
    .pro-sidebar-layout {
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
      }
      ul {
        padding: 0 5px;
        .pro-menu-item > .pro-inner-item {
          color: #ffffff;
          font-weight: 550;
          padding: 10px 0 10px 10px !important;
        }

        .pro-sub-menu {
          padding-right: 10px;
          padding-left: 10px;
          .pro-inner-item {
            padding: 0 !important;
          }
          .pro-item-content {
            padding: 8px 0 !important;
          }
        }
        .pro-inner-item .pro-icon-wrapper {
          background-color: transparent !important;
        }
      }
      .active {
        background: rgba(255, 255, 255, 0.15) 0% 0% no-repeat padding-box;
        border-radius: 10px;
      }
    }
  }

  &.mobile {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 99999;
    .pro-sidebar-inner .pro-sidebar-layout ul .pro-sub-menu {
      padding-left: 0px;
    }
  }

  @media screen and (max-width: 767px) {
    /* display: none; */
  }
`;

export const Container = styled.div`
  background: #3d42c2;
`;

export const Wrapper = styled.div`
  width: 290px;
`;

export const Image = styled.img<{ width: string; height: string }>`
  ${(props) =>
    `
    width: ${props.width};
  `}
  ${(props) =>
    `
    height: ${props.width};
  `}
`;


export const WrapperAll= styled.div`
  -webkit-font-smoothing: initial;
`;

export const WrapperContent = styled.div`
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
export const Content = styled.div<any>`
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
