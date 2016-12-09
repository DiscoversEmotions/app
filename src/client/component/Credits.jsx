import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import _ from 'lodash';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';


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
  background: rgba(0, 0, 0, 0.4);
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

const Title = styled.div`
  width: 15%;
  text-align: right;
  `

const MainText = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 100vh;
  font-size: 13px;
`

const MainTitleBloc = styled.h1`
  width: 48%;
  padding-left: 15%;
  font-size: 16px;
  letter-spacing: 0.2em;
`

const MainDescBloc = styled.p`
  width: 35%;
  padding-left: 15%;
  top: 25px;
  position: relative;
`

const TitleBloc = styled.h1`
  font-size: 15px;
  letter-spacing: 0.2em;
`

const DescBloc = styled.p`
  font-size: 13px;
`

const ListBloc = styled.ul`
  padding: 0;
`

const ListBlocElement = styled.li`
  list-style: none;
`

const Designers = styled.div`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  left: 65%;
`

const Devs = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 54%;
  left: 83%;
`

const Remerciement = styled.div`
  position: absolute;
  top: 65%;
  left: 65%;
`

const Mentions = styled.div`
  position: absolute;
  bottom: 15px;
  right: 30px;
  font-size: 13px;
`

const MentionsList = styled.ul`
  list-style: none;
  display: inline-flex;
`

const MentionsListElement = styled.li`
`

const GobelinsListElement = styled.li`
  margin-left: 25px;
`


const Credits = compose(
  inject((provided) => ({ core: provided.core })),
  ConnectReact(
    {
    }
  )
)((props) => {
  return (
    <Container full={props.full || false }>

      <Title>
        REMEMBER
      </Title>

      <MainText>
        <MainTitleBloc>
          PROJET REMEMBER. GOBELINS, L’ECOLE DE L’IMAGE
        </MainTitleBloc>

        <MainDescBloc>
          Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lavboris nisi ut aliquip ex ea commodo consequat. Ipsum dolor sit amet, consectetur adipiscin elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utnim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </MainDescBloc>
      </MainText>

      <Designers>
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
      </Designers>

      <Devs>
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
      </Devs>

      <Remerciement>
        <TitleBloc>
          REMERCIEMENTS
        </TitleBloc>

        <DescBloc>

          <ListBloc>
            <ListBlocElement>
              Monsieur Yolo (sound design)
            </ListBlocElement>
            <ListBlocElement>
              Madame yaourte (voix off/F)
            </ListBlocElement>
            <ListBlocElement>
              Monsieur yaourte (voix off/H)
            </ListBlocElement>
          </ListBloc>

        </DescBloc>

      </Remerciement>

      <Mentions>

        <MentionsList>
          <MentionsListElement>
            Mentions Légales
          </MentionsListElement>
          <GobelinsListElement>
            GOBELINS
          </GobelinsListElement>
        </MentionsList>

      </Mentions>

    </Container>
  );
});



export default Credits;
