import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
    text-align: center;
`;

const Logo = styled.img`
    width: 200px;
    height: 200px;
`;

const Keyword = styled.p`
    font-size: 12px;
`;

const Name = styled.h1`
    font-size: 36px;
`;

const History = styled.p`
    margin-top: 20px;
    line-height: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardBgColor};
`;

interface Params {
    teamId: string;
}

interface RouteState {
    name: string;
}

interface Hometown {
    city: string;
}

interface Worldseries {
    year: number;
}

interface PermanetNumber {
    no: number;
    name: string;
}

interface ITeam {
    id: string;
    name: string;
    hometown: Hometown[];
    field: string;
    since: number;
    keyword: string;
    logo: string;
    history: string;
    worldseries: Worldseries[];
    permanentNumber: PermanetNumber[];
}

function Team(){
    const { teamId } = useParams<Params>();
    const [team, setTeam] = useState<ITeam>();
    useEffect(() => {
        (async () => {
            const team =await (await fetch(`./data/${teamId}.json`)).json();
            console.log(team);
            setTeam(team);
        })();
    },[]);
    return (
        <Container>
            <Logo src={`./img/teams/${team?.logo}`} alt={team?.name} />
            <Keyword>'{team?.keyword}'</Keyword>
            <Name>{team?.name}</Name>
            <History>{team?.history}</History>
            <h5>since{team?.since}...</h5>
            <ul>
                연고지 이력
                {team?.hometown.map((item) => {
                    return (
                        <li key={item.city}>
                            <span>{item.city}</span>
                        </li>
                    )
                })}
            </ul>
            <h5>홈구장{team?.field}</h5>
            <ul>
                월드시리즈
                {team?.worldseries.map((item) => {
                    return (
                        <li key={item.year}>
                            <span>{item.year}</span>
                        </li>
                    )
                })}
            </ul>
            <ul>
                영구결번
                {team?.permanentNumber.map((item) => {
                    return (
                        <li key={item.no}>
                            <h1>{item.no}</h1>
                            <span>{item.name}</span>
                        </li>
                    )
                })}
            </ul>
        </Container>
    )
}

export default Team;