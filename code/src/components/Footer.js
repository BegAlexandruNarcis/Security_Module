import {
  MailOutline,
  Phone,
  Room,
} from "@material-ui/icons";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  position: absolute;
left:0;
bottom:0;
right:0;
height: '40px'

  ${({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${({ backgroundColor: "#ABC3DE" })}
  
`;

const Logo = styled.h3`
  margin-bottom: 2.5px;  
`;

const Desc = styled.p`
  margin: 8px 0px;
  font-size: 16px;
`;


const Title = styled.h3`
  margin-bottom: 10px;
`;


const Right = styled.div`
  flex: 1;
  padding: 15px;
  ${({ backgroundColor: "#DBEAFC" })}

`;

const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  font-size: 16px;
  align-items: center;
  
`;

const Footer = () => {
  return (
    <Container >
      <Left>
        <Logo><b>KEYMART</b></Logo>
        <Desc>
          A place where you can define a style, your own style, and live the way you want not the way you were told. From most famos brands to the new antreprenures or designers who try to make a name for themselves.
          We enjoy every moment we spend together.
        </Desc>
      </Left>
      <Right>
        <Title ><b>Contact</b></Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Drumul Campului 15A, Timisoara
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> 0256 000 000
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@keymart.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
