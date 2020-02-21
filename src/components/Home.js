import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import BillCard from "./Bill";
import FindMyMp from "./FindMyMp";
import Container from "@material-ui/core/Container";

const Home = props => {
  return (
    <div>
      <Container maxWidth="sm">
        <CategoryDropdown />
        <BillCard />
      </Container>
      <FindMyMp user={props.user} />
    </div>
  );
};
export default Home;
