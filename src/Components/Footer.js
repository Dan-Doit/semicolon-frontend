import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    margin-top:50px;
`;

const List = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom : 20px;
    padding-top : 50px;

`;

const ListItem = styled.li`
    &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
    color: ${props => props.theme.ivoryColor};
 
`;

const Copyright = styled.span`
    color: ${props => props.theme.darkGreyColor};
    align-items: center;
    justify-content: center;
    display: flex;
    padding-bottom:30px;
`;

export default () => (
    <Footer>
        <List>
            <ListItem>
                <Link href="https://github.com/Dan-Doit" target='_blank'>조    단</Link>
            </ListItem>
            <ListItem>
                <Link href="https://github.com/kjhg478" target='_blank'>김 종 훈</Link>
            </ListItem>
            <ListItem>
                <Link href="https://github.com/Soyun-Jung" target='_blank'>정 소 윤</Link>
            </ListItem>
            <ListItem>
                <Link style={{ fontSize: "15px", color:"black" }} href="https://semiinter.netlify.app/index.html" target='_blank'>interaction</Link>
            </ListItem>
            <ListItem>
                <Link href="https://github.com/wjdgodls7" target='_blank'>정 해 인</Link>
            </ListItem>
            <ListItem>
                <Link href="https://github.com/ryuseungha" target='_blank'>류 승 하</Link>
            </ListItem>
            <ListItem>
                <Link href="https://github.com/Donghoon2190" target='_blank'>강 동 훈</Link>
            </ListItem>
        </List>
        <Copyright>semicolon {new Date().getFullYear()} &copy;</Copyright>
    </Footer>
);