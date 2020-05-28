import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import { RankRow } from "../RankRow.js";

export class Rankings extends Component {
    render(){
        return (
            <Container>
                <RankRow team={2590}/>
            </Container>
        )
    }
}