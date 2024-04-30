import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    font-family: "Do Hyeon", sans-serif;
    font-size: 36px;
    font-weight: 700;
    position: relative;
    z-index: 2;
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Btn = styled.button`
    width: 60px;
    height: 60px;
    background-color: ${(props) => props.theme.cardBgColor};
    border: 0;
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 900;
    border-radius: 50%;
    cursor: pointer;
`;

const TeamList = styled.ul``;

const List = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    transition: background-color 0.2s ease-in-out;
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    &:hover {
        background-color: #2bcbba;
    }
`;

const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

const Loading = styled.img`
    display: block;
    width: 200px;
    height: 150px;
    margin: 0 auto;
`;

interface ITeams {
    id: string;
    name: string;
    logo: string;
}

interface ITeamsProps {

}

function Teams({}:ITeamsProps){
    const toggleTheme = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => toggleTheme(prev => !prev);
    const isDark = useRecoilValue(isDarkAtom);
    const [nl, setNl] = useState<ITeams[]>([]);
    const [al, setAl] = useState<ITeams[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selLeague, setSelLeague] = useState(true);
    useEffect(() => {
        (async () => {
            const res = await fetch("./data/teams.json");
            const json = await res.json();
            setNl(json.slice(0, 15));
            setAl(json.slice(15, 30));
            setIsLoading(false);
        })();
    },[]);
    const onClickNl = (e: any) => {
        e.preventDefault();
        setSelLeague(true);
    }
    const onClickAl = (e: any) => {
        e.preventDefault();
        setSelLeague(false);
    }
    return (
        <Container>
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" />
                <link rel="icon" href="./img/logo.svg" />
                <title>What's Your MLB?</title>
            </Helmet>
            <Header>
                <Title>What's Your MLB?</Title>
            </Header>
            {isLoading ? <Loading src="./img/loading.gif" /> : 
            <TeamList>
                <BtnContainer>
                    {selLeague ? <Btn onClick={onClickAl}>AL</Btn> : <Btn onClick={onClickNl}>NL</Btn>}
                    <Btn onClick={toggleDarkAtom}>{isDark ? <>☀️</> : <>🌙</>}</Btn>
                </BtnContainer>
                {selLeague ? <>
                    {nl?.map((item) => {
                    return (
                        <List key={item.id}>
                            <Link to={{
                                pathname: `/${item.id}`,
                                state: { name: item.name }
                            }}>
                                <Logo src={`./img/teams/${item.logo}`} alt={item.name} />
                            </Link>
                        </List>
                    )
                })}
                </> : <>
                    {al?.map((item) => {
                        return (
                            <List key={item.id}>
                                <Link to={{
                                    pathname: `/${item.id}`,
                                    state: { name: item.name }
                                }}>
                                    <Logo src={`./img/teams/${item.logo}`} alt={item.name} />
                                </Link>
                            </List>
                        )
                    })}
                </>}
            </TeamList>}
        </Container>

    )
}

export default Teams;