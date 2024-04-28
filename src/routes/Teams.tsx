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
        background-color: #8c7ae6;
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
function Teams(){
    const [nl, setNl] = useState<ITeams[]>([]);
    const [al, setAl] = useState<ITeams[]>([]);
    useEffect(() => {
        (async () => {
            const res = await fetch("./data/teams.json");
            const json = await res.json();
            setNl(json.slice(0, 15));
            setAl(json.slice(16, 30));
            console.log(json);
        })();
    },[]);
    return (
        <Container>
            <Header>
                <Title>What's Your MLB?</Title>
            </Header>
            <TeamList>
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
            </TeamList>
        </Container>

    )
}

export default Teams;