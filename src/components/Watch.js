import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import BillCard from "./Bill";
import Container from "@material-ui/core/Container";

const Watch = props => {
  return (
    <div>
      <Container maxWidth="sm">
        <CategoryDropdown />
        <BillCard />
      </Container>
    </div>
  );
};
export default Watch;
