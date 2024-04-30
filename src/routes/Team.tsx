import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
    text-align: center;
    position: relative;
`;

const Logo = styled.img`
    width: 200px;
    height: 200px;
    padding: 20px 0;
`;

const Keyword = styled.p`
    font-size: 18px;
    font-weight: 300;
`;

const Name = styled.h1`
    font-size: 36px;
    font-weight: 900;
`;

const SectionContainer = styled.div`
    margin: 5px 0;
    position: relative;
`

const SectionTitle = styled.h5`
    text-align: left;
    padding: 0 0 2px 15px;
    width: calc(50% - 5px);
`;

const History = styled.div`
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

const Since = styled(History)`
    width: calc(50% - 5px);
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
`;

const Hometown = styled.ul`
    width: calc(50% - 5px);
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    padding: 10px 0;
`;

const FieldImg = styled.img`
    width: 100%;
    height: 250px;
    border-radius: 10px;
`;

const Field = styled(History)`
    width: 100%;
    padding: 20px 0;
    margin-bottom: 10px;
`;

const WorldSeries = styled(Hometown)`
    width: 100%;
    padding: 20px 0;
`;

const NumberContainer = styled.li`
    margin-top: 10px;
    cursor: pointer;
    &:first-child {
        margin-top: 0;
    }
    h1 {
        width: 80px;
        height: 80px;
        font-family: "Do Hyeon", sans-serif;
        font-size: 46px;
        font-weight: 700;
        line-height: 80px;
        border-radius: 50%;
        background-color: white;
        margin: 0 auto;
        margin-bottom: 5px;
    }
    p {
        font-size: 14px;
    }
`;

const PnImg = styled.img`
    width: 460px;
    border-radius: 10px;
    margin-top: 10px;
`;

const Btn = styled.button`
    width: 60px;
    height: 60px;
    background-color: ${(props) => props.theme.cardBgColor};
    color: #0be881;
    font-size: 18px;
    font-weight: 700;
    border: 2px solid #2bcbba;
    border-radius: 50%;
    position: fixed;
    z-index: 2;
    left: 20px;
    top: 20px;
`;

const Loading = styled.img`
    display: block;
    width: 200px;
    height: 150px;
    margin: 0 auto;
`;

interface Params {
    teamId: string;
}

interface Hometown {
    no: number;
    city: string;
}

interface Worldseries {
    no: number;
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
    const [isLoading, setIsLoading] = useState(true);
    const [isNumberIndex, setIsNumberIndex] = useState<number | null>(null);
    const [isNumberVisible, setIsNumberVisible] = useState(false);
    useEffect(() => {
        (async () => {
            const team =await (await fetch(`./data/${teamId}.json`)).json();
            setTeam(team);
            setIsLoading(false);
        })();
    },[]);
    const permanentNumber = (index: number) => {
        if(isNumberIndex === index) {
            setIsNumberVisible(false);
            setIsNumberIndex(null);
        }
        else {
            setIsNumberVisible(true);
            setIsNumberIndex(index);
        }
    }
    return (
        <Container key={team?.id}>
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gothic+A1&family=Sunflower:wght@300&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" />
                <title>{team?.name}</title>
                {<link rel="icon" href={`./img/teams/${team?.logo}`} />}
            </Helmet>
            <Link to="/">
                <Btn>👈</Btn>
            </Link>
            {isLoading ? <Loading src="./img/loading.gif" /> : 
                <>
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
                                    <li key={item.no}>
                                        <span>{item.city}</span>
                                    </li>
                                )
                            })}
                        </Hometown>
                    </ArticleContainer>
                    <SectionContainer>
                        <SectionTitle>Home Field</SectionTitle>
                        <Field>{team?.field}</Field>
                        <FieldImg src={`./img/fields/${team?.fieldImg}`} alt={team?.field} />
                    </SectionContainer>
                    <SectionContainer>
                        <SectionTitle>World Series</SectionTitle>
                        <WorldSeries>
                            {team?.worldseries.map((item) => {
                                return (
                                    <li key={item.no}>
                                        <span>{item.year}</span>
                                    </li>
                                )
                            })}
                        </WorldSeries>
                    </SectionContainer>
                    <SectionContainer>
                        <SectionTitle>Permanent Number</SectionTitle>
                        <WorldSeries>
                            {team?.permanentNumber.map((item, index) => {
                                return (
                                    <NumberContainer key={item.name} onClick={() => permanentNumber(index)}>
                                        <h1 style={{color: item.teamColor}}>{item.no}</h1>
                                        <p>{item.name}</p>
                                        {isNumberIndex === index && isNumberVisible && <PnImg src={`./img/numbers/${item.pic}`}/>}
                                    </NumberContainer>
                                )
                            })}
                        </WorldSeries>
                    </SectionContainer>
                </>
            }
        </Container>
    )
}

export default Team;