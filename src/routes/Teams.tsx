import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 900;
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
    color: #0be881;
    font-size: 18px;
    font-weight: 900;
    border: 1px solid #0be881;
    border-radius: 50%;
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
        background-color: #0be881;
    }
`;

const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

interface ITeams {
    id: string;
    name: string;
    logo: string;
}

interface ITeamsProps {
    toggleTheme: () => void;
    isDark: boolean;
}

function Teams({toggleTheme, isDark}:ITeamsProps){
    const [nl, setNl] = useState<ITeams[]>([]);
    const [al, setAl] = useState<ITeams[]>([]);
    const [selLeague, setSelLeague] = useState(true);
    useEffect(() => {
        (async () => {
            const res = await fetch("./data/teams.json");
            const json = await res.json();
            setNl(json.slice(0, 15));
            setAl(json.slice(15, 30));
            console.log(json);
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
            <Header>
                <Title>What's Your MLB?</Title>
            </Header>
            <TeamList>
                <BtnContainer>
                    {selLeague ? <Btn onClick={onClickAl}>AL</Btn> : <Btn onClick={onClickNl}>NL</Btn>}
                    <Btn onClick={toggleTheme}>{isDark ? <>☀️</> : <>🌙</>}</Btn>
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
            </TeamList>
        </Container>

    )
}

export default Teams;