import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
    padding: 20px 0;
`;

const Keyword = styled.p`
    font-size: 12px;
`;

const Name = styled.h1`
    font-size: 36px;
    font-weight: 900;
`;

const SectionContainer = styled.div`
    margin: 5px 0;
`

const SectionTitle = styled.h5`
    text-align: left;
    padding: 0 0 2px 15px;
    width: calc(50% - 5px);
`;

const History = styled.p`
    font-size: 16px;
    line-height: 20px;
    padding: 25px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardBgColor};
`;

const ArticleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Since = styled.h5`
    width: calc(50% - 5px);
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
`;

const Hometown = styled.ul`
    width: calc(50% - 5px);
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    padding: 10px 0;
    font-weight: 500;
`;

const FieldContainer = styled.div`
    margin: 5px 0;
    position: relative;
`;

const FieldImg = styled.img`
    width: 100%;
    height: 250px;
    border-radius: 10px;
`;

const Field = styled.h5`
    width: 100%;
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    padding: 20px 0;
    margin-bottom: 10px;
`;

const WorldSeries = styled.ul`
    width: 100%;
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    padding: 20px 0;
`;

const NumberContainer = styled.li`
    margin-top: 10px;
    &:first-child {
        margin-top: 0;
    }
    h1 {
        width: 80px;
        height: 80px;
        font-size: 46px;
        font-weight: 900;
        color: #000;
        line-height: 80px;
        border-radius: 50%;
        background-color: white;
        margin: 0 auto;
        margin-bottom: 5px;
    }
    p {
        font-size: 14px;
        font-weight: 900;
    }
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
    teamColor: string;
    pic: string;
    name: string;
}

interface ITeam {
    id: string;
    name: string;
    hometown: Hometown[];
    field: string;
    fieldImg: string;
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
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" />
            </Helmet>
            <Logo src={`./img/teams/${team?.logo}`} alt={team?.name} />
            <Keyword>'{team?.keyword}'</Keyword>
            <Name>{team?.name}</Name>
            <SectionContainer>
                <SectionTitle>History</SectionTitle>
                <History>{team?.history}</History>
            </SectionContainer>
            <ArticleContainer style={{marginBottom: 0}}>
                <SectionTitle>Since</SectionTitle>
                <SectionTitle>Home Town</SectionTitle>
            </ArticleContainer>
            <ArticleContainer>
                <Since>{team?.since}</Since>
                <Hometown>
                    {team?.hometown.map((item) => {
                        return (
                            <li key={item.city}>
                                <span>{item.city}</span>
                            </li>
                        )
                    })}
                </Hometown>
            </ArticleContainer>
            <FieldContainer>
                <SectionTitle>Home Field</SectionTitle>
                <Field>{team?.field}</Field>
                <FieldImg src={`./img/fields/${team?.fieldImg}`} alt={team?.field} />
            </FieldContainer>
            <SectionContainer>
                <SectionTitle>World Series</SectionTitle>
                <WorldSeries>
                    {team?.worldseries.map((item) => {
                        return (
                            <li key={item.year}>
                                <span>{item.year}</span>
                            </li>
                        )
                    })}
                </WorldSeries>
            </SectionContainer>
            <SectionContainer>
                <SectionTitle>Permanent Number</SectionTitle>
                <WorldSeries>
                    {team?.permanentNumber.map((item) => {
                        return (
                            <NumberContainer key={item.no}>
                                <h1 style={{color: item.teamColor}}>{item.no}</h1>
                                <p>{item.name}</p>
                            </NumberContainer>
                        )
                    })}
                </WorldSeries>
            </SectionContainer>
        </Container>
    )
}

export default Team;