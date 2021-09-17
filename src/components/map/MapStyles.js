import styled from "styled-components";

export const MapWrap = styled.div`
width:100%;
min-height:100vh;
position:relative;
`

export const mapStyles = {
  height: "100vh",
  width: "100%",

};

export const IconWrap = styled.span`
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
font-size:22px;
color:#000;
box-shadow:1px 1px 5px #555555;
position:absolute;
right:10px;
bottom:40%;
background:#fff;
z-index:9;
cursor:pointer;
&:hover{
  box-shadow:2px 2px 7px #555555;
}
`

