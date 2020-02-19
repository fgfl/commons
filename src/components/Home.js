import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import BillCard from "./Bill";
import Container from "@material-ui/core/Container";

const Home = props => {
  return (
    <div>
      <Container maxWidth="sm">
        <CategoryDropdown />
        <BillCard />
      </Container>
    </div>
  );
};
export default Home;
