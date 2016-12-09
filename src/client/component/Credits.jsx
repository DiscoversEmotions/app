import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import _ from 'lodash';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import LogoGobelins from '~/component/LogoGobelins';


const enterAnim = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const Container = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  height: 100vh;
  font-family: 'Anonymous Pro', monospace;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  animation: ${enterAnim} .3s linear;
`;

const Question  = styled.h3`
  font-size: 3vw;
  position: absolute;
  top: 20%;
  left: 15%;
`;

const LeftContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 15%;
  font-size: 16px;
  width: 40%;
`

const RightContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 65%;
  width: 25%;
  font-size: 16px;
`

const MainTitleBloc = styled.h1`
  font-size: 18px;
  letter-spacing: 0.2em;
`

const MainDescBloc = styled.p`
  margin-top: 20px;
  line-height: 1.5;
`;

const MainDescBlocContainer = styled.div`
  top: 25px;
  position: relative;
`

const TitleBloc = styled.h1`
  font-size: 18px;
  letter-spacing: 0.2em;
`

const DescBloc = styled.p`
  font-size: 16px;
`

const ListBloc = styled.ul`
  padding: 0;
`

const ListBlocElement = styled.li`
  list-style: none;
  padding-top: 5px;
`

const LeftItem = styled.div`
  margin-bottom: 30px;
`

const MentionsList = styled.ul`
  list-style: none;
  display: inline-flex;
`

const MentionsListElement = styled.li`
`

const GobelinsListElement = styled.li`

`

const Credits = (props) => {
  return (
    <Container full={props.full || false }>
      <Question>If you could erase some of your memories,<br />would you dare?</Question>
      <LeftContainer>
        <MainTitleBloc>
          REMEMBER PROJET. GOBELINS, L’ECOLE DE L’IMAGE
        </MainTitleBloc>
        <MainDescBlocContainer>
          <MainDescBloc>
            REMEMBER est une expérience interactive visant à nous provoquer et nous interroger sur nos propres choix, à travers un univers empli de mystère.
          </MainDescBloc>
          <MainDescBloc>
            Le réel enjeu de ce projet a été de nous faire comprendre le lien entre émotions et souvenirs; comprendre la façon unique dont ils sont connectés dans l'aventure d'un protagoniste qui part à la reconquête de ses émotions perdues.
          </MainDescBloc>
          <MainDescBloc>
            Cette expérience a été réalisée en webGL afin de rendre l'expérience la plus immersive possible.
          </MainDescBloc>
          <MainDescBloc>
            Ce projet est l'aboutissement d'un travail de 2 mois, produit dans le cadre d'un projet pédagogique réalisé à Gobelins, l'École de l'Image.
          </MainDescBloc>
        </MainDescBlocContainer>
      </LeftContainer>
      <RightContainer>
        <LeftItem>
          <TitleBloc>
            DESIGN
          </TitleBloc>
          <DescBloc>
            <ListBloc>
              <ListBlocElement>
                Lovis Odin
              </ListBlocElement>
              <ListBlocElement>
                Adrien Muzyczka
              </ListBlocElement>
              <ListBlocElement>
                Aurélie Remia
              </ListBlocElement>
            </ListBloc>
          </DescBloc>
        </LeftItem>
        <LeftItem>
          <TitleBloc>
            CODE
          </TitleBloc>
          <DescBloc>
            <ListBloc>
              <ListBlocElement>
                Etienne Deladonchamps
              </ListBlocElement>
              <ListBlocElement>
                Phuong Nghi Nguyen
              </ListBlocElement>
            </ListBloc>
          </DescBloc>
        </LeftItem>
        <LeftItem>
          <TitleBloc>
            REMERCIEMENTS
          </TitleBloc>
          <DescBloc>
            <ListBloc>
              <ListBlocElement>
                Geoffrey CALDERON (sound design)
              </ListBlocElement>
              <ListBlocElement>
                Yann RIEU (male voice)
              </ListBlocElement>
              <ListBlocElement>
                Alizée AMUAT (femelle over)
              </ListBlocElement>
            </ListBloc>
          </DescBloc>
        </LeftItem>
      </RightContainer>
      <LeftItem>
        <MentionsList>
          <GobelinsListElement>
            <LogoGobelins />
          </GobelinsListElement>
        </MentionsList>
      </LeftItem>
    </Container>
  );
};

export default Credits;
