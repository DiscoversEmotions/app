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
  top: 50%;
  left: 15%;
  font-size: 16px;
  width: 40%;
`

const RightContainer = styled.div`
  position: absolute;
  top: 50%;
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
`;

const TitleBloc = styled.h1`
  font-size: 18px;
  letter-spacing: 0.2em;
`;

const DescBloc = styled.p`
  font-size: 16px;
`;

const ListBloc = styled.ul`
  padding: 0;
`;

const ListBlocElement = styled.li`
  list-style: none;
  padding-top: 5px;
`;

const LeftItem = styled.div`
  margin-bottom: 30px;
`;

const MentionsList = styled.ul`
  list-style: none;
  display: inline-flex;
`;

const Share = styled.a`
  color: white;
  font-weight: 100;
  background: none;
  border: none;
  border-bottom: 1px solid white;
  padding: 0.5em 0em;
  margin-top: 1em;
  font-size: 22px;
  cursor: pointer;
  transition-duration: .3s;
  vertical-align: middle;
  font-family: 'Anonymous Pro', monospace;
  text-decoration: none;

  &:hover {
    background: white;
    color: black;
  }
`;

const MentionsListElement = styled.li``;

const GobelinsListElement = styled.li``;

const Credits = (props) => {
  return (
    <Container full={props.full || false }>
      <Question>If you could erase some of your memories,<br />would you dare?<br /><Share target='_blank' href='https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fprojets.gobelins.fr%2Fdmii%2F2018%2Fremember%2F&amp;src=sdkpreparse'>Share your answer on Facebook</Share></Question>
      <LeftContainer>
        <MainTitleBloc>
          REMEMBER PROJET. GOBELINS, L’ECOLE DE L’IMAGE
        </MainTitleBloc>
        <MainDescBlocContainer>
          <MainDescBloc>
            REMEMBER is as interactive experiment aiming to provoke and question us about our own choices.
          </MainDescBloc>
          <MainDescBloc>
            Our project's main goal have been to make us understand the link between emotions and memories; and figure out the unique way that they are interconnected through the adventure of a protagonist that goes to reconquer his own lost emotions in a mysterious world, collecting little by little pieces from his past.
          </MainDescBloc>
          <MainDescBloc>
            That experiment has been made in webGL to make the experiment the most immersive possible.
          </MainDescBloc>
          <MainDescBloc>
            This project is the result of 2 months worth of work, produced as a school project at Gobelins, l'École de l'Image
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
